

### **📊 Budgeting & Expense Tracker**  

A powerful full-stack budgeting application built with **Next.js**, **MongoDB**, and **Node.js** to help users track expenses, set budgets, and manage finances effectively.  
 

---

## **🚀 Features**  
✅ **User Authentication** (JWT-based login & signup)  
✅ **Expense Tracking** (Categorize & log expenses)  
✅ **Budget Management** (Set category-wise spending limits)  
✅ **Real-time Data Updates**  
✅ **Intuitive UI** (TailwindCSS for modern design)  
✅ **Secure API with JWT Authentication**  

---

## **🛠 Tech Stack**  
- **Frontend:** Next.js, TypeScript, TailwindCSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **State Management:** React Hooks  
- **Styling:** TailwindCSS  

---

## **🚀 Getting Started**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/Anirudhmadhavkulkarni9094/expense-tracker-next-app.git
cd expense-tracker-next-app
```

### **2️⃣ Install Dependencies**  
```bash
# Install frontend dependencies
cd expense-tracker-next-app
npm install
```


### **4️⃣ Run the Application**  

#### **Frontend**  
```bash
cd expense-tracker-next-app
npm run dev
```
The app will be available at **`http://localhost:3000`** 🎉  

---

## **📡 API Endpoints**  

| Method | Endpoint          | Description                  | Auth Required |
|--------|------------------|------------------------------|--------------|
| POST   | `/api/auth/signup` | Register a new user         | ❌           |
| POST   | `/api/auth/login`  | Authenticate user           | ❌           |
| GET    | `/api/budget`      | Fetch all budget categories | ✅           |
| POST   | `/api/budget`      | Add a new budget category   | ✅           |
| PUT    | `/api/budget`      | Edit a budget category      | ✅           |
| DELETE | `/api/budget/:id`  | Delete a budget category    | ✅           |

> **Authorization:** JWT Token must be included in request headers as `Authorization: Bearer <token>`.  

---

## **🛠 Contributing**  

Contributions are welcome! Please follow these steps:  

1. Fork the repo & create a new branch.  
2. Make changes and commit using:  
   ```bash
   git commit -m "✨ [Feature]: Add new budget API"
   ```  
3. Push your branch & create a PR following the **[PR Template](./.github/PULL_REQUEST_TEMPLATE.md)**.  

---
