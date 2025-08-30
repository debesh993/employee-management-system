import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import image1 from "../../assets/image_avatar.png";
import axios from "axios";


const Leave_detail = () => {
    const { id } = useParams();
    const navigate=useNavigate();
    const [leave, setLeave] = useState(null)
    useEffect(() => {
        const fetchLeave = async () => {

            try {
                const response = await axios.get(`https://employee-management-system-api.vercel.app/api/leave/detail/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                // console.log(response.data.employees);
                if (response.data.success) {
                    // console.log(response.data.success);
                    const data = await response.data.leave;
                    setLeave(data);

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            }
        }
        fetchLeave();
    }, [])
    const changeStatus=async(id,status)=>{
        try {
                const response = await axios.put(`https://employee-management-system-api.vercel.app/api/leave/${id}`,{status}, 
                    {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                })
                // console.log(response.data.employees);
                if (response.data.success) {
                  navigate("/admin-dashboard/leave");  
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            }
    }
    // console.log("Image path:", leave?.employeeId?.userId?.profileimage);
    return (
        <div className="container">
            {!leave ? <div >Loading...</div> : (
                <div className="card">
                    <div className="card-header">
                        <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>Leave Detail</p>
                    </div>
                    <div className="card-body" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div>
                            <img
                                src={leave.employeeId.userId.profileimage ? `https://employee-management-system-api.vercel.app/uploads/${leave.employeeId.userId.profileimage}` : image1}
                                alt="Employee"
                                style={{ width: "19vw", height: "19vw", objectFit: "cover", borderRadius: "50%" }}

                            />
                        </div>
                        <div style={{ fontWeight: 700 }}>
                            <p>Name : {leave.employeeId.userId.name}</p>
                            <p>Employee Id : {leave.employeeId.employeeId}</p>
                            <p>Leave Type : {leave.leaveType}</p>
                            <p>Reason : {leave.reason}</p>
                            <p>Department : {leave.employeeId.department.dep_name}</p>
                            <p>Start Date : {new Date(leave.startDate).toISOString().split("T")[0]}</p>
                            <p>End Date : {new Date(leave.endDate).toISOString().split("T")[0]}</p>
                            <div>{leave.status === "Pending" ? (
                                <div style={{display:"flex",alignItems:"center"}}>
                                    <p style={{marginBottom:"0",width:"67px"}}>Action :  </p>
                                    <div style={{width:"169px",display:"flex",justifyContent:"space-between"}}>
                                        <button className="btn btn-primary" onClick={()=>changeStatus(leave._id,"Approved")}>Approve</button>
                                        <button className="btn btn-danger" onClick={()=>changeStatus(leave._id,"Rejected")}>Reject</button>
                                    </div>
                                </div>
                            ) : <p>Status : {leave.status}</p>}</div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}
export default Leave_detail;