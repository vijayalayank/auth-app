import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken";
import { useEffect,useState } from "react";




const Home = () => {
    const navigate = useNavigate();
    const { token } = useToken();
    const [error,seterror] = useState('');
    // const user = useUser(token);
    useEffect(() => {
        if (token) {
            navigate("/home", { replace: true }); // ✅ Prevents back navigation
        }
    }, [token, navigate]);
   

    return(
        <>
            <div className="home">
                <div><h1>Welcome to the site</h1></div>
                {error && <p style={{color:"red"}}>The error message returned {error}</p>}
               <div className="signup"> 
                <button onClick={() => navigate('/login')}>LogIn</button>
               <button onClick={() => navigate('/register')}>SignUp</button>    
               </div>
            </div>
        </>
    )
}

export default Home;