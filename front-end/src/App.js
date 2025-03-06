import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './Pages/HomePage.jsx';
import Login from './Pages/LoginPage.jsx';
import Register from './Pages/RegisterPage.jsx';
import DashBoard from "./Pages/DashBoardPage.jsx";
import ForgotPassword from "./Pages/ForgotPasswordPage.jsx";
import ResetPassword from "./Pages/ResetPasswordPage.jsx";

import PrivateRoute from "./Components/PrivateRoute.jsx";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<PrivateRoute><DashBoard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
