# Military Asset Management System

## 📌 What the Project Does

This project is a **Military Asset Management System** built with a responsive frontend and a secure backend. It helps efficiently manage military assets, track their transfers and purchases, assign them to bases, and view current asset details.

### Key Features:
- Add, update, view, and delete assets
- Track equipment purchases by type, quantity, date, and base
- Manage asset transfers between locations
- Assign equipment to personnel or departments
- Role-based access control (Admin, Staff, etc.)
- Real-time dashboard of asset statistics

---

 How to Run the Project
 1.Frontend Setup (React)**
```bash
cd my-fullstack-app/client
npm install
npm start

2.backend setup

cd my-fullstack-app/server
node index.js





 How to Import the Database


Using pgAdmin:
Open pgAdmin and connect to your PostgreSQL server.

Create a new database (e.g., military_asset1).

Right-click on the new database → Restore or Query Tool.

If using Query Tool:

Open my_fullstack_dump.sql from this project folder.

Execute the script to create tables and seed data.

Make sure the database name matches your .env file setting.


