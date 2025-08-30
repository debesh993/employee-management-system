import { useNavigate } from "react-router-dom";
import image1 from "../../assets/employees.png";
import { useAuth } from "../../context/AuthProvider";

const Employee_information = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="container">
            <div className="card">
                <div className="card-header" style={{backgroundColor:"rgb(39, 123, 193)",display:"flex",alignItems:"center",gap: "1vmax"}}>          
                        <img src={image1} style={{ height: "3vmax", width: "3vmax", borderRadius: "50%" }}></img>
                        <p style={{ fontSize: "1.2vw", fontWeight: 500,marginBottom: "0"}}>Welcome back {user.name} </p>
                </div>
            </div>
        </div>
    )
}
export default Employee_information;