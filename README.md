# Fall Bootcamp Website

A static website for showcasing the **Fall Bootcamp** program, along with full details, registration, and automated payment processing.

## 🖥 Tech Stack

- **Frontend:** [Solid.js](https://www.solidjs.com/) + [Tailwind CSS](https://tailwindcss.com/) for a fast, responsive, and modern UI.
- **Backend:** [FastAPI](https://fastapi.tiangolo.com/) (Python) for API services.
- **Database:** [Neon Serverless PostgreSQL](https://neon.tech/) for scalable, serverless database management.

## 💳 Payment Processing

- Integrated **automatic e-transfer verification** via the **IMAP protocol**.
- Scans incoming e-transfer emails in the inbox.
- Verifies payment details and moves validated transactions to a **dedicated folder**.
- Prevents the reuse of the same transaction for registration.

## ✨ Features

- 📄 **PDF Download** — Static PDF file for the complete course curriculum.
- 📊 **Live Spot Allocation** — Real-time display of remaining spots.
- 🔄 **Automated E-Transfer Management** — Hands-free payment verification and tracking.
- 📝 **Registration Form** — Fully functional form for seamless enrollment.

## 🔒 Security

- Ensures all payments are verified before registration is confirmed.
- Dedicated folder storage for processed transactions to prevent duplicates.

---

This setup delivers a **secure, smooth, and fully automated** registration and payment process for the bootcamp.
