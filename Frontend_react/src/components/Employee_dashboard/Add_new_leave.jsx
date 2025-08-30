import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthProvider";

const Add_new_leave = () => {
    const navigate = useNavigate();
    const {user}=useAuth();
    const [leave, setLeave] = useState({
        userId:user._id, 
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeave((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSubmit = async (e) => {
        // console.log("handlesubmit is running");
        e.preventDefault();
        try {
            const response = await axios.post('https://employee-management-system-api.vercel.app/api/leave/add',leave, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            // console.log(response.data.success);
            if (response.data.success) {
                navigate(`/employee-dashboard/leave/${user._id}`)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div className="container">
            {!leave ? (<div>Loading.....</div>) : (
                <div className="card">
                    <div className="card-header">
                        <p style={{ fontSize: "2vw", fontWeight: 900 }}>Request for leave</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row ">
                                <div className="col">
                                    <label htmlFor="LeaveType">Leave Type</label>
                                    <select name="leaveType" onChange={handleChange} id="LeaveType" className="form-control" defaultValue="" required>
                                        <option value="" disabled>
                                            Select Leave Type
                                        </option>
                                        <option value="Sick Leave">Sick Leave</option>
                                        <option value="Casual Leave">Casual Leave</option>
                                        <option value="Annual Leave">Annual Leave</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">

                                    <label htmlFor="date">From Date</label>
                                    <input type="date" name="startDate" placeholder="" id="date" onChange={handleChange} className="form-control" />
                                </div>
                                <div className="col">

                                    <label htmlFor="date1">To Date</label>
                                    <input type="date" name="endDate" placeholder="" id="date1" onChange={handleChange} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="h1">Description</label>
                                    <textarea name="reason" id="h1" placeholder="Reason" onChange={handleChange} className="form-control"></textarea>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                                    <button style={{ marginTop: '10px' }} type="submit" className="btn btn-primary">
                                        Add Leave
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            )}
        </div >
    )
}
export default Add_new_leave;