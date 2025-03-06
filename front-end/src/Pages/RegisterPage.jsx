import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useToken from "../Hooks/useToken";
import axios from "axios";

const Register = () => {
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [confirmpassword,setconfirmpassword] = useState('');
    const [error, setError] = useState(""); // State to store error message
    const [success, setSuccess] = useState(""); // State to store success message

    const {token} = useToken();
    const navigate = useNavigate();
    useEffect(()=>{
        try{
            if(token){
                navigate("/home");
                // return null;
            }
        }
        catch(err){
            // console.log(err);
            setError(err);
        }
    },[token,navigate])
    
  

    const handle_register = async() =>{
        setError(""); // Clear previous errors
        setSuccess(""); 

        try{
            const result = await axios.post("http://localhost:5000/api/register",
                {
                    username : email,
                    password:password
                }
            )
            setSuccess(result.data.message);
                
            navigate("/login");
            
        }
        catch(error){
            console.error("Full error object:", error);

            if (error.response) {  // ✅ Corrected from error.result to error.response
                setError(error.response.data.message || "Registration failed!");
            } else if (error.request) {
                setError("Server is not responding. Please try again later.");
            } else {
                setError("An unexpected error occurred.");
            }
        }
    }
    return(
        <>
            <div className="masterlogin">
            <div className="login">
              
              <h1>Register page</h1>
              <input type="email"
                  value={email}
                  onChange={(e)=>setemail(e.target.value)}
                  placeholder="Enter your E-mail"
              /> 
              <input type="password" 
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              placeholder="Enter your password"
              /> 
                <input type="password" 
              value={confirmpassword}
              onChange={(e)=>setconfirmpassword(e.target.value)}
              placeholder="Re-Enter your password"
              />
              <button 
              disabled={!email || !password || password !== confirmpassword}
              onClick={handle_register}>Register</button>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <p>Have an account ,<Link to={"/login"}> Login</Link></p>
          </div>
            </div>
        </>
    )
}

export default Register;