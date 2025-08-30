import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const View_salary = () => {
    // const navigate = useNavigate();
    // const [employee, setEmployee] = useState([]);
    const {id}=useParams();
    const [newSalary, setnewSalary] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filterSalary, setfilterSalary] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchSalary = async () => {
            // console.log(id);
            setEmpLoading(true);
            try {
                const response = await axios.get(`https://employee-management-system-api.vercel.app/api/salary/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    const data = await response.data.salary;
                    // console.log("Fetched salaries:", data);
                    setnewSalary(data);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            } finally {
                setEmpLoading(false);
            }
        }
        fetchSalary();
    }, [])

    const filterSal = async (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);

        // if (keyword.trim() === "") {
        //     setfilterSalary([]);
        // }
        const records = newSalary.filter((sal) =>
            sal.employeeId.employeeId.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setfilterSalary(records);
    }
    return (
        <div className="container">
            <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
                Salary History
            </p>
            <div className="search" style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" placeholder="Search by Employee" onChange={filterSal} style={{ marginBottom: "5px" }} />
            </div>
            <div style={{ height: "433px", overflow: "auto" }}>
                <table className="table table-bordered table-hover" >
                    <thead className="bg-primary text-white sticky-top" >
                        <tr>
                            <th>S No</th>
                            <th>EMP ID</th>
                            <th>SALARY</th>
                            <th>ALLOWANCE</th>
                            <th>DEDUCTION</th>
                            <th>TOTAL</th>
                            <th>PAY DATE</th>
                        </tr>
                    </thead>
                    <tbody id="information">
                        {empLoading ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>Loading...</td>
                            </tr>
                        ) : (
                            (() => {
                                const dataToShow = searchTerm.trim() === "" ? newSalary : filterSalary ;

                                if (dataToShow.length === 0) {
                                    return (
                                        <tr>
                                            <td colSpan="7" style={{ textAlign: "center" }}>No Salary Found</td>
                                        </tr>
                                    );
                                }

                                return dataToShow.map((de, index) => (
                                    <tr key={de._id || index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {de.employeeId.employeeId}
                                        </td>
                                        <td>{de.basicSalary}</td>
                                        <td>{de.allowances}</td>
                                        <td>{de.deductions}</td>
                                        <td>
                                            {de.netSalary} 
                                        </td>
                                        <td>{new Date(de.payDate).toISOString().split("T")[0]}</td>
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
export default View_salary;