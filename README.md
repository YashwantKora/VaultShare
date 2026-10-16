# VaultShare

\### AI-Powered Secure File Sharing Platform



VaultShare is a full-stack web application designed to make file sharing safer through encryption, controlled access, and AI-powered sensitive information detection.



The project also explores real-world cybersecurity concepts by demonstrating how intercepted sharing links can be exploited and how security mechanisms can reduce unauthorized access.



> \*\*Project Status:\*\* In Development 🚧  

> \*\*Project Type:\*\* Full Stack Development Lab



\---



\## Problem Statement



Sharing documents online can accidentally expose sensitive information or allow unauthorized users to access confidential files.



VaultShare aims to address this problem through secure file storage, controlled sharing, and AI-assisted detection of potentially sensitive information.



\## Key Features



\- \*\*File Encryption\*\* — Protect files using modern encryption techniques.

\- \*\*Authentication\*\* — Secure user login using JWT-based authentication.

\- \*\*Access Control\*\* — Restrict file access based on permissions.

\- \*\*Secure Sharing Links\*\* — Generate links with expiration and revocation options.

\- \*\*AI-Powered Detection\*\* — Flag potentially sensitive information before sharing.

\- \*\*Security Demonstration\*\* — Simulate sharing-link interception in a controlled environment and evaluate possible attacks and defenses.

\- \*\*Activity Logs\*\* — Track important file-sharing and access events.



\*Features will be implemented and refined as development progresses.\*



\## AI Integration



VaultShare plans to integrate generative AI to analyze document content and identify potentially sensitive information, such as email addresses, phone numbers, and identification numbers.



The system will warn users about potential data exposure before they share a document.



AI-generated results will be treated as suggestions rather than guaranteed security assessments.



\## Security Approach



The project will explore and implement security mechanisms such as:



\- \*\*AES-256 encryption\*\* for file confidentiality at rest.

\- \*\*HTTPS/TLS\*\* for protecting data in transit.

\- \*\*JWT authentication\*\* for verifying users.

\- \*\*Role-Based Access Control (RBAC)\*\* for managing permissions.

\- \*\*Expiring and revocable links\*\* to limit access.

\- \*\*SHA-256 hashing\*\* for file-integrity verification.

\- \*\*Rate limiting and input validation\*\* to reduce common application risks.



\### Security Testing



A controlled demonstration will examine what happens when an attacker obtains a shared file URL.



The demonstration will compare potential weaknesses with implemented defenses, such as authentication requirements, authorization checks, link expiration, and revocation.



All attack simulations will be conducted against the project's own test environment and sample files.



\## 🛠️ Planned Technology Stack



| Component | Technology |

|---|---|

| Frontend | React + TypeScript |

| Backend | Node.js + Express |

| Database | PostgreSQL |

| Authentication | JWT |

| AI Integration | Generative AI API |

| Security | AES-256, HTTPS/TLS, SHA-256 |

| Version Control | Git + GitHub |

| Deployment | To be decided |



\## High-Level Architecture





User

&#x20; │

&#x20; ▼

React + TypeScript Frontend

&#x20; │

&#x20; ▼

Node.js + Express API

&#x20; │

&#x20; ├── Authentication \& Authorization

&#x20; ├── File Upload \& Validation

&#x20; ├── Encryption \& Secure Storage

&#x20; ├── Sharing Links \& Expiration

&#x20; ├── AI-Based Document Analysis

&#x20; └── Activity Logging

&#x20; │

&#x20; ▼

PostgreSQL + File Storage





\## Sustainable Development Goal



\*\*SDG 16 — Peace, Justice and Strong Institutions\*\*



VaultShare supports safer information exchange and privacy-conscious handling of sensitive documents.



\## Project Team



Developed as a group project for the Full Stack Development Lab.



\- \*\*Team Members:\*\* To be added

\- \*\*Institution:\*\* To be added

\- \*\*Academic Year:\*\* 2026–2027



\## Future Scope



\- Document summarization and question answering.

\- Stronger sharing policies and configurable download limits.

\- Security audit reports and improved threat detection.

\- Automated testing and CI/CD.

\- Cloud deployment.



\---



\*VaultShare aims to combine full-stack development, practical cybersecurity, and responsible AI to make document sharing safer.\*

