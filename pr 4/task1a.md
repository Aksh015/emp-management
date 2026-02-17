# Task 1a: Identify Compliance

Based on the **Dayflow HR** project architecture and data structures, here is the compliance identification analysis.

## 1. Identify the Type of Data You Collect

**Dayflow HR** collects and processes several categories of data:

| Data Category | Specific Data Points in Dayflow | Compliance Implication |
| :--- | :--- | :--- |
| **Personally Identifiable Information (PII)** | • First Name, Last Name<br>• Email Address<br>• Phone Number<br>• Residential Address<br>• Profile Picture / Banner | Subject to privacy laws like **GDPR**, **CCPA**, **DPDP Act**. |
| **Sensitive Personal Information (SPI)** | • **Financial:** Bank Details (Account No, IFSC/IBAN), Salary Structure.<br>• **Authentication:** Passwords (Hashed), Login IDs. | Requires strict access controls and encryption. Financial data *may* trigger **PCI-DSS** if payments are processed, but currently, you only store records. |
| **Employee Records** | • Date of Joining, Job Title, Department<br>• Attendance Logs (Check-in/out times)<br>• Performance / Certificates | Subject to labor laws and employment record-keeping regulations. |
| **Potential Health Data** | • **Sick Leave Requests:** May contain medical reasons or attached medical certificates. | If dealing with detailed health records, could touch upon **HIPAA** (US) or general health data privacy provisions. |

## 2. Identify Where Your Users Are Located

Compliance is strictly tied to the physical location of your users (employees and admins).

| User Location | Applicable Regulation |
| :--- | :--- |
| **India** (Likely Development Location) | **Digital Personal Data Protection (DPDP) Act, 2023** |
| **European Union (EU)** | **GDPR (General Data Protection Regulation)** |
| **California, USA** | **CCPA (California Consumer Privacy Act)** |
| **United Kingdom** | **UK GDPR** |
| **Canada** | **PIPEDA** |

*> **Recommendation:** As a project likely starting in India, prioritize **DPDP Act** compliance. If you plan to sell this as SaaS globally, **GDPR** is the gold standard to aim for.*

## 3. Identify Your Industry

**Primary Industry:** **Human Resources (HR) Technology / SaaS (Software as a Service)**.
*   Since Dayflow is an HRMS, it acts as a **Data Processor** for the companies (Data Fiduciaries) that use it.

**Client Industries:**
If your clients are in regulated industries, Dayflow inherits some compliance requirements:
*   **Healthcare Clients:** If a hospital uses Dayflow for its staff, you arguably store data relevant to **HIPAA**.
*   **Banking/Finance Clients:** May require **SOC 2** reports to trust your security.
*   **Education:** If used by schools/universities, **FERPA** (US) might apply to student-employees.

## 4. Check Contractual Requirements

Since this is an internal/university project currently, there are no binding contracts yet. However, for a real-world deployment:

*   **Cloud Hosting (Vercel/Render/MongoDB Atlas):** You implicitly agree to their Acceptable Use Policies. They are compliant (SOC 2, GDPR), which helps your compliance posture.
*   **Third-Party Services (Cloudinary):** You are sending image data (avatars, documents) to Cloudinary. You must ensure you are allowed to transfer this data (Data Processing Agreement).

---

## Summary of Applicable Compliance Standards

1.  **General Data Privacy (Must Have):**
    *   **DPDP Act (India)** or **GDPR (EU)**: Because you store clear PII (Names, Emails, Phones).
    *   *Action:* Ensure users can request data deletion ("Right to be Forgotten") and access their data.

2.  **Security Standards (Best Practice):**
    *   **SOC 2 (Type I/II):** The industry standard for SaaS companies to prove they are secure.
    *   *Action:* Maintain audit logs (which you have started with `console.log` but need a real logger), secure access (JWT), and encrypted backups.

3.  **Financial (If Applicable):**
    *   **PCI-DSS:** Not currently applicable as Dayflow appears to *store* bank details for payroll processing but does not seem to *process* credit card transactions directly.
    *   *Note:* Storing Bank Account numbers is sensitive; ensure strict database access controls.
