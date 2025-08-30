import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const Attendance_employee = () => {
    const today = new Date().toISOString().split("T")[0];
    const { id } = useParams();
    const [report, setReport] = useState({})
    const [limit, setLimit] = useState(5)
    const [skip, setSkip] = useState(0)
    const [dateFilter, setDatefilter] = useState()
    const [loading, setLoading] = useState(false)
    const [statusFilter,setstatusFilter]=useState();
    const fetchReport = async () => {
        try {
            setLoading(true);
            const query = new URLSearchParams({ limit, skip, id })
            if (dateFilter) {
                query.append("date", dateFilter)
            }
            const response = await axios.get(`http://localhost:5000/api/attendance/report/employee?${query.toString()}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                if (skip === 0) {
                    console.log(response.data.groupData)
                    setReport(response.data.groupData)
                } else {
                    console.log(response.data.groupData)
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
        setLimit((p) => p + 5)
    }
    const getCurrentMonth = () => {
        const now = new Date();
        return now.toLocaleString("default", { month: "long", year: "numeric" });
    };


    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-GB");
    };

    const filterByButton=(status)=>{
        setstatusFilter(status);
    }
    return (
        <div className="container">
            <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
                My Attendance
            </p>
            <div style={{ display: "flex" }}>
                <h4>Filter by Date : </h4>
                <input type="date" style={{ marginLeft: "7px" }} onChange={(e) => {
                    setDatefilter(e.target.value);
                    setSkip(0);
                }} />

            </div>
            {loading ? <div>Loading...</div> :
                <div style={{ marginTop: "10px", width: "100%" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                        <h2>{dateFilter ? formatDate(dateFilter) : getCurrentMonth()}</h2>
                        <div style={{ width: "38%" }}>
                            <label style={{ marginRight: "16px", fontSize: "3vh", fontWeight: 500 }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Present"
                                    onChange={(e) => filterByButton(e.target.value)}
                                />
                                Present
                            </label>

                            <label style={{ marginRight: "16px", fontSize: "3vh", fontWeight: 500 }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Absent"
                                    onChange={(e) => filterByButton(e.target.value)}
                                />
                                Absent
                            </label>

                            <label style={{ marginRight: "16px", fontSize: "3vh", fontWeight: 500 }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Sick"
                                    onChange={(e) => filterByButton(e.target.value)}
                                />
                                Sick
                            </label>
                            <label style={{ marginRight: "16px", fontSize: "3vh", fontWeight: 500 }}>
                                <input
                                    type="radio"
                                    name="status"
                                    value="Leave"
                                    onChange={(e) => filterByButton(e.target.value)}
                                />
                                Leave
                            </label>
                        </div>
                    </div>
                    <div style={{ height: "333px", overflow: "auto", width: "100%" }}>
                        <table className="table table-bordered table-hover">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th>S NO</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(report)
                                    .flatMap(([date, records]) =>
                                        records.map((data) => ({ ...data, date }))
                                    ).filter((row) => !statusFilter || row.status === statusFilter)
                                    .map((row, index) => (
                                        <tr key={`${row.date}-${row._id || index}`}>
                                            <td>{index + 1}</td>
                                            <td>{row.date}</td>
                                            <td>{row.status}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            }
            <div className="btn btn-primary" onClick={handleLoadmore}>Load More</div>
        </div>
    )
}

export default Attendance_employee;