# Task 3: Apply OWASP SAMM Preparation Phase

**Objective:** Identify the current Maturity level across different SAMM business functions (Governance, Design, Implementation, Verification, Operations), identify gaps, and design security goals based on those gaps for Dayflow HR.

## 1. Current Maturity Level Assessment
Based on the current state of Dayflow HR (as identified in previous tasks), here is the assessment across the five OWASP SAMM Business Functions:

| Business Function | Current Practice in Dayflow HR | Estimated Maturity Level (0-3) |
| :--- | :--- | :--- |
| **Governance** | No formal security strategy, policies, or compliance metrics defined yet. Basic awareness of data privacy (DPDP/GDPR) exists. | **Level 0.5** (Initial/Ad-hoc) |
| **Design** | Basic architecture exists. Threat modeling is informal (identifying general threats like unauthorized access). Security requirements are just being gathered. | **Level 1** (Basic understanding) |
| **Implementation** | Basic secure build processes. Relying on default framework security (React/Node). Unstructured code review process. | **Level 1** (Ad-hoc implementation) |
| **Verification** | No formal automated security testing or penetration testing. Relying on manual testing of features. | **Level 0** (No formal verification) |
| **Operations** | Cloud hosting (Vercel/Render/MongoDB Atlas) provides basic infrastructure security. Incident management and environment hardening are not formalized. | **Level 1** (Platform-dependent) |

**Overall Initial SAMM Level:** ~0.7 (Between Level 0 and Level 1 - Ad-hoc/Initial state)

## 2. Gap Analysis
*   **Governance Gaps:** Lack of formal data privacy policies, no security training for developers, compliance is understood but not legally formalized.
*   **Design Gaps:** No formal threat models or structured security architecture reviews for critical components like Payroll or Authentication.
*   **Implementation Gaps:** Lack of automated dependency scanning, inconsistent input validation across all endpoints.
*   **Verification Gaps:** Absence of DAST/SAST tools in the CI/CD pipeline, no formal security testing phase before deployment.
*   **Operations Gaps:** Missing audit logs for sensitive actions, lack of a formal incident response plan, no rate limiting on APIs.

## 3. Security Goals (Based on Gaps Identified)
1.  **Governance Goal:** Define a clear data privacy policy and Terms of Service mapping to the DPDP Act and GDPR before production launch.
2.  **Design Goal:** Conduct a structured threat modeling session (e.g., using STRIDE) specifically for the payroll and user authentication modules.
3.  **Implementation Goal:** Implement centralized input validation (using Zod) for all backend APIs and ensure secure password storage (Bcrypt).
4.  **Verification Goal:** Integrate a basic SAST tool (e.g., automated `npm audit` or SonarQube) into the GitHub Actions/CI workflow.
5.  **Operations Goal:** Implement comprehensive Audit Logging for sensitive database writes (Payroll, Bank details) and configure Rate Limiting on authentication endpoints to prevent brute-force attacks.
