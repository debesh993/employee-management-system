import axios from "axios";
import { useEffect, useState } from "react";

const Attendance_report = () => {
    const [report, setReport] = useState({})
    const [limit, setLimit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [dateFilter, setDatefilter] = useState()
    const [loading, setLoading] = useState(false)
    const fetchReport = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({ limit, skip })
            if (dateFilter) {
                query.append("date", dateFilter)
            }
            const response = await axios.get(`http://localhost:5000/api/attendance/report?${query.toString()}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                if (skip === 0) {
                    setReport(response.data.groupData)
                } else {
                    // console.log(response.data.groupData)
                    setReport((prevData) => ({ ...prevData, ...response.data.groupData }))
                }
            }
            setLoading(false);
        } catch (error) {
            alert(error.message);
        }
    }
    useEffect(() => {
        fetchReport();
    }, [skip, dateFilter]);

    const handleLoadmore = () => {
        setSkip((prevSkip) => prevSkip + limit);
        setLimit((p)=>p+5)
    }
    return (
        <div className="container">
            <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
                Manage Attendance
            </p>
            <div style={{ display: "flex"}}>
                <h4>Filter by Date : </h4>
                <input type="date" style={{marginLeft:"7px"}} onChange={(e) => {
                    setDatefilter(e.target.value);
                    setSkip(0);
                }} />
            </div>
            <div style={{ height: "433px", overflow: "auto",marginTop:"10px" }}>
                {loading ? <div>Loading...</div> : Object.entries(report).map(([date, record]) => (
                    <div >
                        <h2>{date}</h2>
                        <table className="table table-bordered table-hover" >
                            <thead className="bg-primary text-white" >
                                <tr>
                                    <th>S No</th>
                                    <th>Name</th>
                                    <th>Emp Id</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {record.map((data, i) => (
                                    <tr key={data.employeeId}>
                                        <td>{i + 1}</td>
                                        <td>{data.employeeName}</td>
                                        <td>{data.employeeId}</td>
                                        <td>{data.departmentName}</td>
                                        <td>{data.status}</td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>
                )
                )}
            </div>
            <div className="btn btn-primary" onClick={handleLoadmore}>Load More</div>
        </div>
    )
}

export default Attendance_report;