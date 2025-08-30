import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const Employee_leaves = () => {
    const navigate = useNavigate();
    const {user}=useAuth();
    // const [employee, setEmployee] = useState([]);
    const [newLeave, setnewLeave] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filterLeave, setfilterLeave] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const {id}=useParams();
    useEffect(() => {
        const fetchLeave = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/leave/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response.data)
                if (response.data.success) {
                    setnewLeave(response.data.leaves);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            } finally {
                setEmpLoading(false);
            }
        }
        fetchLeave();
    }, [])

    const handleLeave = () => {
        navigate("/employee-dashboard/add-new-leave")
    }

    const filterlev = async (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);
        const records = newLeave.filter((leav) =>
            leav.status.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setfilterLeave(records);
    }

    return <div className="container">
        <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
            Manage Leaves
        </p>
        <div className="search" style={{ display: "flex", justifyContent: "space-between" }}>
            <input type="text" placeholder="Search by Status" onChange={filterlev} style={{ marginBottom: "5px" }} />
            {user.role==="employee" && 
                <button style={{ marginBottom: "5px" }} onClick={handleLeave} className="btn btn-success">Add Leave</button>
            }
        </div>
        <div style={{ height: "433px", overflow: "auto" }}>
            <table className="table table-bordered table-hover" >
                <thead className="bg-primary text-white sticky-top" >
                    <tr>
                        <th>SNO</th>
                        <th>LEAVE TYPE</th>
                        <th>FROM</th>
                        <th>TO</th>
                        <th>DESCRIPTION</th>
                        <th>APPLIED DATE</th>
                        <th>STATUS</th>
                    </tr>
                </thead>
                <tbody id="information">
                    {empLoading ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: "center" }}>Loading...</td>
                        </tr>
                    ) : (
                        (() => {
                            const dataToShow = searchTerm.trim() === "" ? newLeave : filterLeave;

                            if (dataToShow.length === 0) {
                                return (
                                    <tr>
                                        <td colSpan="7" style={{ textAlign: "center" }}>No Leave Found</td>
                                    </tr>
                                );
                            }

                            return dataToShow.map((de, index) => (
                                <tr key={de._id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {de.leaveType}
                                    </td>
                                    <td>{new Date(de.startDate).toISOString().split("T")[0]}</td>
                                    <td>{new Date(de.endDate).toISOString().split("T")[0]}</td>
                                    <td>{de.reason}</td>
                                    <td >
                                        {new Date(de.appliedAt).toISOString().split("T")[0]}
                                    </td>
                                    <td>{de.status}</td>
                                </tr>
                            ));
                        })()
                    )}
                </tbody>
            </table>
        </div>
    </div>

}
export default Employee_leaves;