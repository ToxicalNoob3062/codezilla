import { API_BASE_URL } from "./base";
export type Transaction = {
  date: string;
  reference_number: string;
  sent_from: string;
  amount: string;
  mail_id: string;
};
export default async function verifyTransaction(
  referenceNumber: string,
): Promise<Transaction | null> {
  const response = await fetch(`${API_BASE_URL}/verify/${referenceNumber}`);
  let responseData = await response.json();
  return responseData.transaction ? responseData.transaction : null;
}
