# Task 1b: Identify Security Requirements

Based on the compliance needs (**DPDP Act**, **GDPR**) identified in Task 1a, here are the specific security requirements for **Dayflow HR**.

## Security Requirements Table

| Requirement Category | Specific Requirement | Implementation Strategy |
| :--- | :--- | :--- |
| **1. Confidentiality (Data Privacy)** | **Encryption in Transit:** All data transmission between Client, Server, and DB must be encrypted. | **HTTPS/TLS 1.2+** via Vercel/Render settings. Force redirect HTTP to HTTPS. |
| **1. Confidentiality (Data Privacy)** | **Encryption at Rest:** Sensitive Personal Information (SPI) like **Bank Details** and **Passwords** must be encrypted. | - **Passwords:** `bcrypt` (Salted Hashing).<br>- **Bank Details:** Field-level encryption (AES-256) before saving. |
| **1. Confidentiality (Data Privacy)** | **Access Control (RBAC):** Strict Role-Based Access Control to ensure Employees cannot view others' PII. | Verify every API endpoint checks `req.user.companyName` AND (`req.user.role` OR `req.user.id` match). |
| **2. Integrity** | **Input Validation:** Prevent Injection attacks (NoSQL Injection, XSS). | Use **Zod** on backend to validate and sanitize all incoming payloads. |
| **2. Integrity** | **Data Consistency:** Ensure payroll and leave data is accurate and tamper-evident. | Use **Database Transactions** (Mongoose Sessions) for operations affecting multiple documents. |
| **3. Availability** | **Backups:** Prevent data loss. | Enable automated daily backups in **MongoDB Atlas**. Test restore process. |
| **3. Availability** | **Rate Limiting:** Prevent DoS and Brute Force attacks. | Implement `express-rate-limit` middleware on `server.js`, especially for `/api/auth/login`. |
| **4. Auditing & Accountability** | **Audit Logs:** Keep a trail of "Who accessed what and when" for sensitive actions. | Create an `AuditLog` model. Record `userId`, `action`, `resourceId`, `timestamp`, and `ipAddress` for critical writes. |
| **5. Compliance Controls** | **Right to Erase (Data Deletion):** Ability to permanently delete all data for a user. | Ensure `DELETE /employees/:id` wipes deeply nested data (logs, attendance). |
| **5. Compliance Controls** | **Consent Management:** Explicit consent for data collection during Onboarding. | Add a "Terms & Privacy Policy" checkbox on the Signup form. |

---

## Action Plan (Prioritized)
1.  **High:** Implement **Audit Logging** (Essential for SOC2/Enterprise).
2.  **High:** Add **Rate Limiting** to auth routes.
3.  **Medium:** Encrypt `bankDetails` in the database.
4.  **Medium:** Add Backend Validation (Zod) similar to Frontend.
