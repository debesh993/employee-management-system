import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
    const navigate = useNavigate();
    // const [employee, setEmployee] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filterAttendance, setfilterAttendance] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    const fetchAttendance = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('https://employee-management-system-api.vercel.app/api/attendance', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    const data = await response.data.attendance;
                    // console.log("Fetched departments:", data);
                    const allattendance = data.map(i => {
                        return {
                            employeeId: i.employeeId.employeeId,
                            department: i.employeeId.department.dep_name,
                            name:i.employeeId.userId.name,
                            status:i.status
                        };
                    })
                    // console.log(allEmployee)
                    setAttendance(allattendance);
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
        fetchAttendance();
    }, [])

    const handleAttendance = () => {
        navigate("/admin-dashboard/attendance-report")
    }

    const filterDep = async (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);

        // if (keyword.trim() === "") {
        //     setfilterAttendance([]);
        // }
        const records = attendance.filter((att) =>
            att.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setfilterAttendance(records);
    }

    const handleAtt=async({status,employeeId})=>{
        console.log(employeeId)
        const response=await axios.put(`https://employee-management-system-api.vercel.app/api/attendance/update/${employeeId}`,{status}, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })

        if(response.data.success){
            fetchAttendance();
        }
    }

    return <div className="container">
        <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
            Manage Attendance
        </p>
        <div className="search" style={{ display: "flex", justifyContent: "space-between" }}>
            <input type="text" placeholder="Search by Employee" onChange={filterDep} style={{ marginBottom: "5px" }} />
            <p style={{fontWeight:500}}>Mark Attendance for <span style={{ textDecoration: "underline" }}>{new Date().toISOString().split("T")[0]}</span></p>
            <button style={{ marginBottom: "5px" }} onClick={handleAttendance} className="btn btn-success">Attendance Report</button>
        </div>
        <div style={{ height: "433px", overflow: "auto" }}>
            <table className="table table-bordered table-hover" >
                <thead className="bg-primary text-white sticky-top" >
                    <tr>
                        <th>S No</th>
                        <th>Name</th>
                        <th>Emp Id</th>
                        <th>Department</th>
                        <th style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody id="information">
                    {empLoading ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>Loading...</td>
                        </tr>
                    ) : (
                        (() => {
                            const dataToShow = searchTerm.trim() === "" ? attendance : filterAttendance;

                            if (dataToShow.length === 0) {
                                return (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center" }}>No Attendence Found</td>
                                    </tr>
                                );
                            }

                            return dataToShow.map((de, index) => (
                                <tr key={de._id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {de.name}
                                    </td>
                                    <td>{de.employeeId}</td>
                                    <td>{de.department}</td>
                                    <td>{
                                            de.status==null?(
                                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {/* <button className="btn btn-success" onClick={() => navigate(`/admin-dashboard/editDepartment/${de._id}`)}>Edit</button> */}
                                        <button className="btn btn-success" onClick={()=>handleAtt({ status: "Present", employeeId: de.employeeId })} style={{ marginLeft: "10px" }}>Present</button>
                                        <button className="btn btn-primary" onClick={()=>handleAtt({ status: "Absent", employeeId: de.employeeId })} style={{ marginLeft: "10px" }}>Absent</button>
                                        <button className="btn btn-danger" onClick={()=>handleAtt({ status: "Sick", employeeId: de.employeeId })} style={{ marginLeft: "10px" }}>Sick</button>
                                        <button className="btn btn-warning" onClick={()=>handleAtt({ status: "Leave", employeeId: de.employeeId })} style={{ marginLeft: "10px" }}>Leave</button>
                                    </div>
                                            ):(<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{de.status}</div>) 
                                        }</td>
                                    
                                </tr>
                            ));
                        })()
                    )}
                </tbody>
            </table>
        </div>
    </div>

}
export default Attendance;