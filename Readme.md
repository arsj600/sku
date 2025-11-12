Product & SKU Management System (Node.js + MongoDB)
A lightweight, production-style Product & SKU Management System built with Node.js, Express, and MongoDB.
It supports product and SKU (stock) management with validation, pagination, analytics, and role-based access.

🚀 Features
Create and update Products
Manage multiple SKUs

Cannot activate a SKU if parent product is inactive
Pagination, filtering & sorting
Role-based access (admin, manager)
Analytics endpoint
Clean validation and error handling
Tech Stack
| Backend | Node.js, Express | | Database | MongoDB (Mongoose ODM) | | Validation | express-validator | | Auth | Simple role-based middleware (mocked user) | | Environment | dotenv |

Setup Instructions
Clone the repository
git clone https://github.com/arsj600/sku.git

Install dependencies
npm install

MONGODB_URL="mongodb+srv://127.0.0.1:27017/"

PORT=4000
