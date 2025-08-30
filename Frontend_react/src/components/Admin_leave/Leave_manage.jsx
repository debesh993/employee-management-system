import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Leave_manage = () => {
    const navigate=useNavigate();
    const [newLeave, setnewLeave] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filterLeave, setfilterLeave] = useState([]);
    // const [searchTerm, setSearchTerm] = useState("");
    const fetchLeave = async () => {
        setEmpLoading(true);
        try {
            const response = await axios.get('https://employee-management-system-api.vercel.app/api/leave', {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                const data = await response.data.leaves.map(i => {
                    return {
                        _id: i._id,
                        employeeId: i.employeeId.employeeId,
                        name: i.employeeId.userId.name,
                        leaveType: i.leaveType,
                        department: i.employeeId.department.dep_name,
                        days: new Date(i.endDate).getDate() - new Date(i.startDate).getDate(),
                        status: i.status
                    };
                })
                // console.log(allEmployee)
                setnewLeave(data);
                setfilterLeave(data);
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error)
            }
        } finally {
            setEmpLoading(false);
        }
    }
    useEffect(() => {
        fetchLeave()
    }, [])
    
    const filterlev = async (e) => {
        const keyword = e.target.value;
        // setSearchTerm(keyword);
        if(keyword.trim()===""){
            setfilterLeave(newLeave);
        }
        const records = newLeave.filter((leav) =>
            leav.employeeId.includes(e.target.value)
        )
        setfilterLeave(records);
    }


    const filterByButton = async (status) => {
        const records = newLeave.filter((leav) =>
            leav.status.toLowerCase().includes(status.toLowerCase())
        )
        setfilterLeave(records);
    }



    return (
        <div className="container">
            <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
                Manage Leaves
            </p>
            <div className="search" style={{ display: "flex", justifyContent: "space-between", widows: "100%" }}>
                <input type="text" placeholder="Search by Emp Id" onChange={filterlev} style={{ marginBottom: "5px" }} />
                <div style={{ marginBottom: "5px", display: "flex", width: "30%", justifyContent: "space-between" }}>
                    <button onClick={()=>filterByButton("Pending")} className="btn btn-success" >Pending</button>
                    <button onClick={()=>filterByButton("Approved")} className="btn btn-success" >Approved</button>
                    <button onClick={()=>filterByButton("Rejected")} className="btn btn-success" >Rejected</button>
                </div>
            </div>
            <div style={{ height: "433px", overflow: "auto" }}>
                <table className="table table-bordered table-hover" >
                    <thead className="bg-primary text-white sticky-top" >
                        <tr>
                            <th>SNO</th>
                            <th>Emp Id</th>
                            <th>Name</th>
                            <th>Leave Type</th>
                            <th>Department</th>
                            <th>Days</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="information">
                        {empLoading ? (
                            <tr>
                                <td colSpan="8" style={{ textAlign: "center" }}>Loading...</td>
                            </tr>
                        ) : (
                            (() => {
                                if (filterLeave.length === 0) {
                                    return (
                                        <tr>
                                            <td colSpan="8" style={{ textAlign: "center" }}>No Leave Found</td>
                                        </tr>
                                    );
                                }

                                return filterLeave.map((de, index) => (
                                    <tr key={de._id || index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {de.employeeId}
                                        </td>
                                        <td>{de.name}</td>
                                        <td>{de.leaveType}</td>
                                        <td>{de.department}</td>
                                        <td >
                                            {de.days}
                                        </td>
                                        <td>{de.status}</td>
                                        <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <button className="btn btn-success" onClick={()=>navigate(`/admin-dashboard/leave/${de._id}`)}>View</button>
                                        </td>
                                    </tr>
                                ));
                            })()
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Leave_manage;