import image from "../assets/dashboard.png";
import image1 from "../assets/employees.png";
import image2 from "../assets/departments.png";
import image3 from "../assets/calender.png";
import image4 from "../assets/salary.png";
import image5 from "../assets/settings.png";
import image7 from "../assets/currency.png";
import image8 from "../assets/attendence.png";
import "../styles/dashboard.css";
import { useNavigate,useLocation } from "react-router-dom";

function Dash_board() {
    const location = useLocation();
    const navigate=useNavigate();
    const handledashboard=()=>{
        navigate("/admin-dashboard/dashboard");
    }
    const handleDepartment=()=>{
        navigate("/admin-dashboard/departments");
    }
    const handleEmployee=()=>{
        navigate("/admin-dashboard/employee-list")
    }
    const handleSalary=()=>{
        navigate("/admin-dashboard/add-salary")
    }
    const handleSetting=()=>{
        navigate("/admin-dashboard/setting")
    }
    const handleLeave=()=>{
        navigate("/admin-dashboard/leave")
    }
    const handleAttendance=()=>{
        navigate("/admin-dashboard/attendance")
    }
    const handleReport=()=>{
        navigate("/admin-dashboard/attendance-report")
    }
    return (<div className="dash">

                <h2 onClick={handledashboard}
                className={location.pathname === "/admin-dashboard/dashboard" ? "active" : ""}>
                    <img src={image} /><div>Dashboard</div></h2>
                <h2 onClick={handleEmployee} className={location.pathname === "/admin-dashboard/employee-list" ? "active" : ""}>
                    <img src={image1} /><div>Employees</div></h2>
                <h2 onClick={handleDepartment} className={location.pathname === "/admin-dashboard/departments" ? "active" : ""}>
                    <img src={image2} /><div>Departments</div></h2>
                <h2 onClick={handleLeave}  className={location.pathname === "/admin-dashboard/leave" ? "active" : ""}><img src={image3} /><div>Leaves</div></h2>
                <h2 onClick={handleSalary} className={location.pathname === "/admin-dashboard/add-salary" ? "active" : ""}><img src={image7} /><div>Salary</div></h2>
                <h2 onClick={handleAttendance} className={location.pathname === "/admin-dashboard/attendance" ? "active" : ""}><img src={image8} /><div>Attendance</div></h2>
                <h2 onClick={handleReport} className={location.pathname === "/admin-dashboard/attendance-report" ? "active" : ""}><img src={image8} /><div>Attendance Report</div></h2>
                <h2 onClick={handleSetting}  className={location.pathname === "/admin-dashboard/setting" ? "active" : ""}><img src={image5} /><div>Settings</div></h2>

            </div>)
}
export default Dash_board;