import axios from "axios";
import { useDepartment } from "../../context/DepartmentList";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Edit_employee = () => {
    const navigate = useNavigate();
    const { departments } = useDepartment();
    const [employee, setEmployee] = useState({
        name: "",
        maritalStatus: "",
        designation: "",
        salary: 0,
        department: ""
    });
    const { id } = useParams();
    // console.log(departments);
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`https://employee-management-system-api.vercel.app/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                // console.log( await response.data.employees);
                if (response.data.success) {
                    // console.log(response.data.success);
                    const data = await response.data.employees;
                    setEmployee((prev) => ({ ...prev, name: data.userId.name,
                         maritalStatus: data.maritalStatus,
                        designation:data.designation,
                        salary:data.salary,
                        department:data.department._id
                }));

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            }
        }
        fetchEmployee();
    }, [])
    // console.log(employee);
    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmployee((prevData) => ({ ...prevData, [name]: value }))

    }
    

    const handleSubmit = async (e) => {
        // console.log("handlesubmit is running");
        e.preventDefault();
        // console.log("Form data before submit:", formData);
        try {
            const response = await axios.put(`https://employee-management-system-api.vercel.app/api/employee/${id}`, employee, {
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
            {(!departments || !employee) ? (<div>Loading.....</div>) : (
                <div className="card">
                    <div className="card-header">
                        <p style={{ fontSize: "2vw", fontWeight: 900 }}>Edit Employee</p>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="empName">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={employee.name}
                                        onChange={handleChange}
                                        id="empName"
                                        placeholder="Insert name"
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="maritalStatus">Marital Status</label>
                                    <select name="maritalStatus" value={employee.maritalStatus} onChange={handleChange} id="maritalStatus"  className="form-control" required>
                                        <option value="" disabled >
                                            Select Status
                                        </option>
                                        <option value="Married">Married</option>
                                        <option value="Unmarried">Unmarried</option>
                                    </select>
                                </div>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="designation">Designation</label>
                                    <input
                                        type="text"
                                        name="designation"
                                        value={employee.designation}
                                        onChange={handleChange}
                                        id="designation"
                                        className="form-control"
                                        placeholder="Designation"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row ">
                                <div className="col">
                                    <label htmlFor="department">Department</label>
                                    <select name="department" value={employee.department} onChange={handleChange} id="department" className="form-control" required>
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
                                    <label htmlFor="salary">Salary</label>
                                    <input
                                        type="number"
                                        name="salary"
                                        value={employee.salary}
                                        onChange={handleChange}
                                        id="salary"
                                        className="form-control"
                                        placeholder="Salary"
                                        required
                                    />
                                </div>

                            </div>


                            <div className="row">
                                <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                                    <button style={{ marginTop: '10px' }} type="submit" className="btn btn-primary">
                                        Edit Employee
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>)}
        </div>
    );
};
export default Edit_employee;
