## Product Description
---
The software in question is a banking system that allows users to register, create an account, and keep track of their accounts. Furthermore, implementations outside of the product itself include: unit testing for the software, GitHub flow as the branch-based flow strategy, monitoring using Azure Insights, and more.

## Assumptions
---
- The necessary IaaS, SaaS, and PaaS services are provided to guarantee deployment and success. This principally refers to Azure.
    
- The software will be continuously maintained and upgraded using the established CI/CD pipeline in this repository.
    
- Encryption and security protocols (e.g., SSL, data encryption, two-factor authentication) will be in place to protect user data.
    
- The system will be scalable to handle user growth without performance degradation.
    
- The system will comply with relevant regulations (e.g., GDPR, PCI DSS) for data protection and banking operations.
    
- Backup and disaster recovery mechanisms will prevent data loss and ensure system availability.
    
- Third-party integrations with payment gateways or financial systems will be supported as required.
    
- The system will maintain 24/7 availability with 99.9% uptime, leveraging Azure infrastructure.
    
### Constraints
---
The following requirements were set as constraints for a successful system deployment:

- The web application must show a home page when they enter the root URL of the current website.
    
- The web application must allow the user to add a new field into bank account data: country. The users must be able to submit the account country when they are creating a new account.
    
- The project must have a Software Requirements Specification document.
    
- Unit and functional tests must be used to test the backend API.
    
- GitHub flow must be set as the branch-based workflow strategy.
    
- Azure Application Insights must be used to enable monitoring of the application.
    
- The project must be deployed in the User Acceptance Testing (UAT) environment.
    
- The development costs must not exceed 3000 euros.

# Functional Requirements
---
### Admin Portal 
---
The IE Bank system will include a bank user's management system that can be accessed and controlled by a bank administrator. A bank users management portal will allow an admin user to view, create, update, and delete bank users.

- **FR 1. The application must provide a default administrator account (user, password). The admin account must be able to access the users management portal once logged in successfully.**
- **FR 2. Once logged into the bank users management portal, a bank administrator can list, create, update, and delete bank users and passwords.**

#### Administrator Login  
---
The system shall allow the administrator at the bank to log into the admin portal with the default administrator account that will be created once

- **Admin Account Name:** A unique identifier for the administrator account
- **Admin Account Password:** A unique password for the administrator account

#### Administrator List Accounts
---
The system shall allow the administrator to list the account objects which allows the administrator to see their information with their following attributes.

- **User Account ID:**   A unique identifier for the account object.

The objects displayed to the administrator will be the following: 
1. `User History`
2. `User Balance`
3. `User Account ID`
4. `User Account Name`
5. `User Account Number`
6. `User Country`
7. `User Balance`
8. `User Currency`
9. `User Status`
10. `User Created At` 
#### Administrator Update Accounts
---
The system shall allow the administrator to update the all user account objects after listing the accounts with the following attributes.
 
- **User Account Name:** A unique name of the account holder
- **User Account Password:** A unique password for the user account
- **User Country:** The country where the user account is registered
- **User Balance:** The current balance of the user account
- **User Currency:** The currency used for the account
- **User Status:** The date and time when the user account was created

The objects can be updated to other values, but cannot be deleted or `null` within the database.
#### Administrator Create Accounts
---
The system shall allow the administrator to create/register new user accounts by adding in new attributes through a frontend register page.

- **User Account Name:** The name of the account holder
- **User Account Password:** A unique password for the account holder 

A unique `User Account ID` will be added to the database upon successfully inputting the attributes outlined.   
#### Administrator Delete Accounts
---
The system shall allow the administrator to delete user accounts on a separate page with the following attributes:

- **User Account ID:** A unique identifier for the account object
- **User Account Name:** The name of the account holder
- **User Account Password:** A unique password for the account holder
