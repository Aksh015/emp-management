# Task 4: Use OWASP ASVS & Conclusion

## Verified Security Requirements

*Note: Requirements are color-coded as per the task instructions using HTML inline styles.*

<ul>
  <li style="color: yellow; text-shadow: 1px 1px 2px black;"><strong>Basic Authentication:</strong> Ensure the system has a login mechanism with username and password. <em>(Identified in Practical 3)</em></li>
  <li style="color: yellow; text-shadow: 1px 1px 2px black;"><strong>HTTPS Enforcement:</strong> Ensure the application is served over HTTPS to protect data in transit. <em>(Identified in Practical 3)</em></li>
  
  <li style="color: green;"><strong>Role-Based Access Control (RBAC):</strong> Strict access control to ensure employees cannot view others' PII or financial data. <em>(Based on Compliance)</em></li>
  <li style="color: green;"><strong>Data Deletion (Right to Erase):</strong> Ensure a process exists to delete user data upon request to comply with privacy laws. <em>(Based on Compliance)</em></li>
  
  <li style="color: red;"><strong>ASVS V2.1.1 (Password Security):</strong> Verify that user passwords are hashed securely using an approved algorithm (like bcrypt) with a strong salt. <em>(Based on ASVS)</em></li>
  <li style="color: red;"><strong>ASVS V4.1.1 (Access Control Bypass):</strong> Verify that the application enforces access control rules on a trusted service layer, preventing Insecure Direct Object Reference (IDOR). <em>(Based on ASVS)</em></li>
  <li style="color: red;"><strong>ASVS V5.1.1 (Input Validation):</strong> Verify that the application has defenses against HTTP parameter pollution and all inputs are validated server-side. <em>(Based on ASVS)</em></li>
  
  <li style="color: lightgreen; text-shadow: 1px 1px 1px black;"><strong>Audit Logging:</strong> Keep a comprehensive trail of "Who accessed what and when" for all sensitive actions and API calls. <em>(Added after gaining pro-active control knowledge)</em></li>
  <li style="color: lightgreen; text-shadow: 1px 1px 1px black;"><strong>Rate Limiting:</strong> Implement rate limiting on authentication routes to prevent DoS and Brute Force attacks. <em>(Added after gaining pro-active control knowledge)</em></li>
  <li style="color: lightgreen; text-shadow: 1px 1px 1px black;"><strong>Centralized Input Validation (Zod):</strong> Enforce strict validation and sanitization of all incoming payloads before database interaction. <em>(Added after gaining pro-active control knowledge)</em></li>
</ul>

---

## Conclusion

**Initial SAMM level with basic security control knowledge:** [ Level 0.5 (Initial/Ad-hoc state with basic authentication and framework defaults) ]

**Security requirements added/update after Pro-active control knowledge :** [ Implemented Audit Logging for sensitive endpoints, API Rate Limiting, and Centralized Input Validation using Zod parsing. ]

**Security requirements added/update with help of ASVS :** [ Strict verification of server-side Role-Based Access Control (ASVS V4.1.1) to prevent IDOR, and enforcing secure password hashing standards (ASVS V2.1.1). ]

**Security requirements added/update after risk analysis :** [ Identified the need for Field-Level Data Encryption at Rest for highly sensitive records like Bank Details and Tax IDs. ]

**Update SAMM level with basic security control knowledge:** [ Level 1.5 (Transitioning from Initial to Structured, with defined security goals and early implementation of proactive controls and ASVS standards.) ]
