import axios from "axios";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken";
import useUser from "../Hooks/useUser";
import DashBoard from "./DashBoardPage";
import { Link } from "react-router-dom";

const Login = () => {
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const [error,seterror]= useState('');
    const navigate = useNavigate();

    const { token,saveToken } = useToken();

    useEffect(()=>{
        try{
            if(token){
                navigate("/home");
                // return null;
            }
        }
        catch(err){
            seterror(err);
        }   
    },[token,navigate])

    const handle_login = async() =>{
        seterror('');

        try{
            const response = await axios.post("http://localhost:5000/api/login",
                {
                    username:email,
                    password:password
                }
            )
            saveToken(response.data.token);
            // console.log(response.data.token);
            navigate("/home");
            // console.log("Navigated to /home route")
        }
        catch(error){
                console.log("raw error object",error);
                if (error.response) {
                    seterror(error.response.data.message || "Login failed!");
                  } else if (error.request) {
                    seterror("Server is not responding. Please try again later.");
                  } else {
                    seterror("An unexpected error occurred.");
                  }
                
        }
    }
    return(
        <>
           <div className="masterlogin">
           <div className="login">
                <h1>Login page</h1>
                <input type="email"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    placeholder="Enter your E-mail"
                /> 
                {error && <p style={{color:"red"}}>{error}</p>}
                <input type="password" 
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                placeholder="Enter your password"
                />
                <button 
                disabled={!email || !password}  
                onClick={handle_login}>LogIn</button>
               <div>
               <p><Link to={"/forgot-password"}>Forgot Password</Link></p>
               <p>Doesn't Have an account <Link to={"/register"}>Register Now!!</Link></p>
               </div>
            </div>
           </div>
        </>
    )
}

export default Login;