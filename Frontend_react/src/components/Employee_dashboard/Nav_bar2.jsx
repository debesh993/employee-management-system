import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { useAuth } from '../../context/AuthProvider';
function Nav_bar2() {
    const {user,logout}=useAuth();
    const navigate=useNavigate();
    const handleLogout=()=>{
        logout();
        navigate("/login");
    }
    const handleaccount=()=>{
        navigate("/employee-dashboard/account")
    }
    return (
        <div className="nav">
            <h2 className="h">Welcome {user.name} </h2>
            <div className="nav_part2">
                {/* <button  className="btn btn-success" style={{cursor:"pointer"}}>About</button> */}
                <button onClick={handleaccount} className="btn btn-success" style={{cursor:"pointer"}}>Account</button>
                <button onClick={handleLogout} className="btn btn-success" style={{cursor:"pointer"}}>Logout</button>
            </div>
        </div>
    )
}
export default Nav_bar2;