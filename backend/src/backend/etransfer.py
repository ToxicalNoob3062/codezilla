from email.header import decode_header
from dataclasses import dataclass
import imaplib
import email
import re
import os
from dotenv import load_dotenv

load_dotenv()

# Email credentials and server settings
IMAP_SERVER = os.getenv("IMAP_SERVER")
IMAP_PORT = int(os.getenv("IMAP_PORT")) # type: ignore
EMAIL_ACCOUNT = os.getenv("EMAIL_ACCOUNT")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD") # type: ignore

# Data class to hold transaction details
@dataclass
class Transaction:
    date: str
    reference_number: str
    sent_from: str
    amount: str
    mail_id: str = ""  # default last
    def __str__(self):
        return (f"Mail ID: {self.mail_id}\n"
                f"Date: {self.date}\n"
                f"Reference Number: {self.reference_number}\n"
                f"Sent From: {self.sent_from}\n"
                f"Amount: {self.amount}\n"
                + "-"*40)


# Parse transaction details from email body
def parse_transaction_details(body: str) -> Transaction:
    date_pattern = r"Date:\s*(.+)"
    ref_pattern = r"Reference Number:\s*([A-Za-z0-9]+)"
    sent_from_pattern = r"Sent From:\s*(.+)"
    amount_pattern = r"Amount:\s*(.+)"

    date_match = re.search(date_pattern, body)
    ref_match = re.search(ref_pattern, body)
    sent_from_match = re.search(sent_from_pattern, body)
    amount_match = re.search(amount_pattern, body)

    return Transaction(
        date=date_match.group(1).strip() if date_match else "",
        reference_number=ref_match.group(1).strip() if ref_match else "",
        sent_from=sent_from_match.group(1).strip() if sent_from_match else "",
        amount=amount_match.group(1).strip() if amount_match else ""
    )

def get_all_transactions() -> list[Transaction]:
    # Connect to the email server and fetch emails
    mail = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT) # type: ignore
    mail.login(EMAIL_ACCOUNT, EMAIL_PASSWORD) # type: ignore
    mail.select("INBOX")
    status, search_data = mail.search(None, '(FROM "notify@payments.interac.ca")')

    # Check if any emails were found
    if status != 'OK':
        print("No messages found!")
        return []

    # Fetch emails and parse transaction details
    transactions = []
    email_ids = search_data[0].split()
    for e_id in email_ids:
        status, msg_data = mail.fetch(e_id, '(RFC822)')
        if status != 'OK':
            print(f"Failed to fetch email id {e_id}")
            continue
        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                body = ""
                if msg.is_multipart():
                    for part in msg.walk():
                        content_type = part.get_content_type()
                        content_disposition = str(part.get("Content-Disposition"))
                        if content_type == "text/plain" and "attachment" not in content_disposition:
                            try:
                                body_bytes = part.get_payload(decode=True)
                                charset = part.get_content_charset() or 'utf-8'
                                body += body_bytes.decode(charset, errors='ignore') # type: ignore
                            except:
                                pass
                else:
                    body_bytes = msg.get_payload(decode=True)
                    charset = msg.get_content_charset() or 'utf-8'
                    body += body_bytes.decode(charset, errors='ignore') # type: ignore

                # Parse transaction details from body
                txn = parse_transaction_details(body)
                txn.mail_id = e_id.decode()
                transactions.append(txn)
    # Logout from the email server
    mail.logout()
    return transactions

def move_from_inbox(mail_id, destination)-> bool:
    mail = imaplib.IMAP4_SSL(IMAP_SERVER, IMAP_PORT) # type: ignore
    mail.login(EMAIL_ACCOUNT, EMAIL_PASSWORD) # type: ignore
    mail.select("INBOX")
    result = mail.copy(mail_id, destination)
    if result[0] == 'OK':
        mail.store(mail_id, '+FLAGS', '\\Deleted')
        mail.expunge()
        mail.logout()
        return True
    else:
        mail.logout()
        print(f"Failed to move email {mail_id} to {destination}.")
        return False
