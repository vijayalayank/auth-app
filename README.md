---

Authentication Template (MERN Stack)
A fully functional authentication system built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). This template provides a ready-to-use authentication flow, including **JWT authentication, password hashing, user roles, and session management**.

🚀Features
✅ User authentication (Login, Signup, Logout)  
✅ Password hashing with **bcrypt.js**  
✅ JWT-based authentication and authorization  
✅ Role-based access control (Admin/User)  -- Add if needed
✅ Protected routes for authenticated users  
✅ MongoDB database 
✅ React frontend with context-based state management  
✅ RESTful API for authentication  
✅ Responsive UI with basic styling  

---

📂Project Structure
```
auth-app/
│-- back-end/            # Node.js & Express backend  
│   ├── config/          # Database connection & environment variables  
│   ├── controllers/     # Authentication logic (Signup, Login, Logout)  
│   ├── middleware/      # JWT authentication middleware  
│   ├── models/         # Mongoose User schema  
│   ├── routes/         # API endpoints  
│   ├── server.js       # Main backend entry point  
│  
│-- front-end/           # React frontend  
│   ├── src/components/  # Reusable UI components  
│   ├── src/pages/       # Login & Signup pages  
│   ├── src/context/     # Authentication state management  
│   ├── src/services/    # API calls to backend  
│   ├── App.js          # Main frontend entry point  
│  
│-- .gitignore  
│-- README.md  
│-- package.json  
```

---

🛠️Tech Stack
Frontend: React.js, Context API  
Backend: Node.js, Express.js  
Database: MongoDB  
Authentication: JWT, bcrypt.js  
Others: dotenv, axios  

---

🔧Installation & Setup
1️⃣ Clone the repository  
```bash
git clone https://github.com/vijayalayank/auth-app.git
cd auth-app
```

2️⃣ Install dependencies  
For Backend  
```bash
cd back-end
npm install
```

For Frontend  
```bash
cd ../front-end
npm install
```

3️⃣ Configure Environment Variables  
Create a `.env` file in `back-end/` and add:  
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4️⃣ Run the Project  
Start the backend  
```bash
cd back-end
npm start
```

Start the frontend  
```bash
cd ../front-end
npm start
```

---

📌API Endpoints
| Method | Endpoint       | Description        | Protected |
|--------|--------------|--------------------|------------|
| POST   | `/api/auth/register` | Register a new user | ❌ |
| POST   | `/api/auth/login`    | Login user & get token | ❌ |
| GET    | `/api/auth/user`     | Get logged-in user data | ✅ |
| POST   | `/api/auth/logout`   | Logout user | ✅ |

---

🎯 **Future Improvements**
- 🔹 OAuth integration (Google, GitHub login)  
- 🔹 Email verification & password reset  
- 🔹 UI improvements with Tailwind CSS  
- 🔹 Admin panel for user management  

---

💡 Contributing
Feel free to fork this repo, suggest improvements, or open an issue if you find any bugs!  

---

📜 License
This project is licensed under the **MIT License**.  

📌 Star ⭐ this repo if you found it useful!  

---

