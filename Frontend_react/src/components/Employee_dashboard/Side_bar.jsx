import image from "../../assets/dashboard.png";
import image1 from "../../assets/employees.png";
import image2 from "../../assets/departments.png";
import image3 from "../../assets/calender.png";
import image4 from "../../assets/salary.png";
import image5 from "../../assets/settings.png";
import image6 from "../../assets/currency.png";
import image7 from "../../assets/attendence.png"
import "../../styles/dashboard.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Side_bar() {
    const navigate=useNavigate();
    const location = useLocation();
    const {user}=useAuth();
    const handledashboard=()=>{
        navigate("/admin-dashboard/dashboard");
    }
    
    const handleProfile=()=>{
        navigate(`/employee-dashboard/my-profile/${user._id}`)
    }
    const handleLeave=()=>{
        navigate(`/employee-dashboard/leave/${user._id}`)
    }
    const handleSalary=()=>{
        navigate(`/employee-dashboard/salary/${user._id}`)
    }
    const handleSetting=()=>{
        navigate ("/employee-dashboard/setting")
    }
    const handleAttendance=()=>{
        navigate(`/employee-dashboard/attendence-report/${user._id}`)
    }
    return (<div className="dash">

                <h2 onClick={handledashboard} className={location.pathname.includes("/dashboard") ? "active" : ""}><img src={image} /><div>Dashboard</div></h2>
                <h2 onClick={handleProfile} className={location.pathname.includes("/my-profile") ? "active" : ""}><img src={image1} /><div>My Profile</div></h2>
                <h2 onClick={handleLeave} className={location.pathname.includes("/leave") ? "active" : ""}><img src={image3} /><div>Leave</div></h2>
                <h2 onClick={handleSalary} className={location.pathname.includes("/salary") ? "active" : ""}><img src={image6} /><div>Salary</div></h2>
                <h2 onClick={handleAttendance} className={location.pathname.includes("/attendence-report") ? "active" : ""}><img src={image7} /><div>Attendance Report</div></h2>
                <h2 onClick={handleSetting} className={location.pathname.includes("/setting") ? "active" : ""}><img src={image5} /><div>Settings</div></h2>


            </div>)
}
export default Side_bar;