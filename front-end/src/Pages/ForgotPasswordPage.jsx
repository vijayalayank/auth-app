import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken";
import { useEffect } from "react";// Import useToken hook

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [otp, setOtp] = useState("");
    const [serverOtp, setServerOtp] = useState(null);
    const [success, setSuccess] = useState("");
    const { token,saveToken } = useToken(); // Use the saveToken function
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
       
    const sendOtp = async () => {
        setError("");
        try {
            const response = await axios.post("http://localhost:5000/api/send-otp", {
                username: email
            });

            const genOtp = response.data.gen_OTP;
            const tempToken = response.data.token; // Get the temp token from response

            // console.log("Generated OTP from server:", genOtp);
            // console.log("Temp token:", tempToken);

            setServerOtp(genOtp); // Store OTP for verification
            saveToken(tempToken); // Save temporary token in localStorage

            setSuccess(response.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred");
            // console.log("Complete error object", err);
        }
    };

    const handleVerification = () => {
        setError("");

        // console.log("Server OTP:", serverOtp);
        // console.log("User entered OTP:", otp);

        if (Number(otp) === Number(serverOtp)) {
            navigate("/reset-password"); // Redirect to reset password page after successful OTP verification
        } else {
            setError("OTP does not match");
        }
    };

    return (
        <div className="masterlogin">
            <div className="login">
                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="otp">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                    <button onClick={sendOtp}>Send OTP</button>
                </div>

                <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                />
                {success && <p style={{ color: "green" }}>{success} (valid for 15 mins)</p>}

                <button disabled={!otp} onClick={handleVerification}>
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
