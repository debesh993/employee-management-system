import { useEffect, useState } from "react";
import { useDepartment } from "../../context/DepartmentList";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

const Add_salary = () => {
    const navigate=useNavigate();
    const { departments } = useDepartment();
    const [employee, setEmployee] = useState([])
    const [employees, setEmployees] = useState({
        employeeId: null,
        basicSalary: 0,
        allowances: 0,
        deductions: 0,
        payDate: null,

    });

    const getEmployees = async (id) => {
        // setDepLoading(true);
        // console.log(id)
        try {
            const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.success) {
                return response.data.employees;

                // console.log("Fetched departments:", data);

            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                console.log(error.response.data.error)
            }
        }
        return [];
    }
    const handleDepartment = async (e) => {
        const id = e.target.value;
        const emps = await getEmployees(id)
        setEmployee(emps);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployees((prevData) => ({ ...prevData, [name]: value }));
    }
    const handleSubmit = async (e) => {
        // console.log("handlesubmit is running");
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/salary/add', employees, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(response.data.success);
            if (response.data.success) {
                navigate("/admin-dashboard/employee-list")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div className="container">
            {(!departments || departments.length === 0) ? (<div>Loading.....</div>) : (
                <div className="card">
                    <div className="card-header">
                        <p style={{ fontSize: "2vw", fontWeight: 900 }}>Add New Salary</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row ">
                                <div className="col">
                                    <label htmlFor="department">Department</label>
                                    <select name="department" onChange={handleDepartment} id="department" className="form-control" defaultValue="" required>
                                        <option value="" disabled>
                                            Select Department
                                        </option>
                                        {departments.length === 0 ? (
                                            <option disabled>No departments found</option>
                                        ) : (
                                            departments.map((dept, index) => (
                                                <option key={dept._id || index} value={dept._id}>
                                                    {dept.dep_name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div className="col">
                                    <label htmlFor="employee">Employee</label>
                                    <select name="employeeId" onChange={handleChange} id="employee" className="form-control" defaultValue="" required>
                                        <option value="" disabled>
                                            Select Employee
                                        </option>
                                        {employee.length === 0 ? (
                                            <option disabled>No employees found</option>
                                        ) : (
                                            employee.map((emp, index) => (
                                                <option key={emp._id || index} value={emp._id}>
                                                    {emp.employeeId}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="salary">Basic Salary</label>
                                    <input
                                        type="number"
                                        name="basicSalary"
                                        onChange={handleChange}
                                        id="salary"
                                        placeholder="Insert salary"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="allowances">Allowances</label>
                                    <input
                                        type="number"
                                        name="allowances"
                                        onChange={handleChange}
                                        id="allowances"
                                        className="form-control"
                                        placeholder="Monthly Allowances"
                                        required
                                    />
                                </div>

                            </div>

                            <div className="row">
                                <div className="col">
                                    <label htmlFor="deductions">Deductions</label>
                                    <input
                                        type="number"
                                        name="deductions"
                                        onChange={handleChange}
                                        id="deductions"
                                        className="form-control"
                                        placeholder="Monthly Deductions"
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="date">Pay Date</label>
                                    <input type="date" name="payDate" placeholder="" id="date" onChange={handleChange} className="form-control" />
                                </div>

                            </div>


                            <div className="row">
                                <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                                    <button style={{ marginTop: '10px' }} type="submit" className="btn btn-primary">
                                        Add Salary
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Add_salary;