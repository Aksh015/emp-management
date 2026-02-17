# Task 2: Identify Security Category Level (OWASP ASVS)

Based on the **OWASP Application Security Verification Standard (ASVS)**, here is the classification for **Dayflow HR**.

## Selected Level: **ASVS Level 2 (Standard)**

### Justification
**Dayflow HR** falls under **Level 2** because it handles sensitive data and performs business-critical functions, but is not a critical infrastructure system.

| Criteria | Dayflow HR Analysis | Matches Level |
| :--- | :--- | :--- |
| **Data Sensitivity** | Stores **PII** (Names, Phones) and **Sensitive Business Data** (Salaries, Bank Accounts). | **Level 2** |
| **Business Criticality** | Used for daily operations (Attendance, Payroll). Downtime or data loss causes significant business disruption. | **Level 2** |
| **Threat Model** | Targeted by typical attackers (opportunistic, script kiddies, or disgruntled employees). Not typically targeted by nation-states (Level 3). | **Level 2** |
| **Transaction Value** | Processes payroll data (indirect monetary value), but does not directly transfer millions of dollars like a core banking system. | **Level 2** |

---

## What this means for Dayflow HR

Achieving **ASVS Level 2** means the application must defend against most of the risks associated with software today.

### Key Requirements for Level 2 Compliance:

1.  **Authentication:**
    *   Enforce strong password policies (NIST guidelines).
    *   Implement Rate Limiting on login (to prevent Brute Force).
    *   *Current Status:* Basic Auth exists; Rate Limiting needed.

2.  **Access Control:**
    *   Enforce strict Role-Based Access Control (RBAC) at the API level (Server-side).
    *   Ensure IDOR (Insecure Direct Object Reference) protection (already identified as a need).

3.  **Data Protection:**
    *   Encrypt sensitive data at rest (Bank Details, Tax IDs).
    *   Ensure Transport Layer Security (TLS/HTTPS) for all communications.

4.  **Validation:**
    *   Sanitize all inputs to prevent XSS and Injection attacks.
    *   Verify file uploads (images/documents) for malware or malicious types.

### Why not Level 1?
*   Level 1 is too low. It is for applications where low confidence in security is acceptable. Dayflow stores **Bank Details** and **Employee Records**, which demands higher trust.

### Why not Level 3?
*   Level 3 is for critical systems (Medical devices, Military, Core Banking). Dayflow is an internal administrative tool; while important, its failure does not directly threaten life or national security.
