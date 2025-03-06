import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken";
import useUser from "../Hooks/useUser";
import { useEffect } from "react"; // Import useUser hook

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { token, removeToken } = useToken(); // Get temp token
    const user = useUser(token); // Decode user details from token
    const navigate = useNavigate();

    
    // useEffect(()=>{
    //     try{
    //         if(token){
    //             navigate("/home");
    //             // return null;
    //         }
    //     }
    //     catch(err){
    //         setError(err);
    //     }   
    // },[token,navigate])  

    const resetPassword = async () => {
        if (!token) {
            setError("Session expired! Request OTP again.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/reset-password", {
                password: newPassword,
                username:user.username // Send temporary token
            });

            // console.log(response.data.message);

            // Clear temp token and set new permanent token
            removeToken(); 

            setSuccess("Password reset successfully! Redirecting to login...");
            setTimeout(() => {
                navigate("/login"); // Redirect to login after success
            }, 2000);
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="masterlogin">
            <div className="login">
                {error && <p style={{ color: "red" }}>{error}</p>}

                <h3>Reset Password for {user?.email || "your account"}</h3>

                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                />

                <button disabled={!newPassword} onClick={resetPassword}>
                    Reset Password
                </button>

                {success && <p style={{ color: "green" }}>{success}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
