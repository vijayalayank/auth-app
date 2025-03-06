import useUser from "../Hooks/useUser";
import { useNavigate } from "react-router-dom";
import useToken from "../Hooks/useToken";

const DashBoard = ()=>{
    const { token, removeToken } = useToken();
    const user = useUser(token);
    const navigate = useNavigate();
    
    return(
        <div>
      <h2>Welcome, {user?.username || "User"}!</h2>
      <button onClick={() => { removeToken(); navigate("/"); }}>Logout</button>
    </div>
    )
}

export default DashBoard;