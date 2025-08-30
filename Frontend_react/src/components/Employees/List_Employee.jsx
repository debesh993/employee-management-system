import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../../assets/image_avatar.png";

const List_Employee = () => {
    const navigate = useNavigate();
    // const [employee, setEmployee] = useState([]);
    const [newEmployee, setNewEmployee] = useState([]);
    const [empLoading, setEmpLoading] = useState(false);
    const [filterEmployees, setfilterEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const fetchEmployees = async () => {
            setEmpLoading(true);
            try {
                const response = await axios.get('https://employee-management-system-api.vercel.app/api/employee', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    const data = await response.data.employees;
                    // console.log("Fetched departments:", data);
                    const allEmployee = await response.data.employees.map(i => {
                        return {
                            _id: i._id,
                            name: i.userId.name,
                            dob: new Date(i.dob).toISOString().split("T")[0], // Format date 
                            department: i.department.dep_name || "N/A", // Assuming department is populated with .name
                            image: i.userId.profileimage || null
                        };
                    })
                    // console.log(allEmployee)
                    setNewEmployee(allEmployee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            } finally {
                setEmpLoading(false);
            }
        }
        fetchEmployees();
    }, [])

    const handleEmployee = () => {
        navigate("/admin-dashboard/add-new-employee")
    }

    const filterDep = async (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);

        if (keyword.trim() === "") {
            setfilterEmployees([]);
        }
        const records = newEmployee.filter((emp) =>
            emp.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setfilterEmployees(records);
    }

    return <div className="container">
        <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
            Manage Employees
        </p>
        <div className="search" style={{ display: "flex", justifyContent: "space-between" }}>
            <input type="text" placeholder="Search by Employee" onChange={filterDep} style={{ marginBottom: "5px" }} />
            <button style={{ marginBottom: "5px" }} onClick={handleEmployee} className="btn btn-success">Add New Employee</button>
        </div>
        <div style={{ height: "433px", overflow: "auto" }}>
            <table className="table table-bordered table-hover" >
                <thead className="bg-primary text-white sticky-top" >
                    <tr>
                        <th>S No</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                        <th>Departments</th>
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
                            const dataToShow = searchTerm.trim() === "" ? newEmployee : filterEmployees;

                            if (dataToShow.length === 0) {
                                return (
                                    <tr>
                                        <td colSpan="5" style={{ textAlign: "center" }}>No Employee Found</td>
                                    </tr>
                                );
                            }

                            return dataToShow.map((de, index) => (
                                <tr key={de._id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            src={de.image ? `https://employee-management-system-api.vercel.app/${de.image}` : image1}
                                            alt="Employee"
                                            style={{ width: "35px", height: "35px", objectFit: "cover", borderRadius: "50%" }}

                                        />
                                    </td>
                                    <td>{de.name}</td>
                                    <td>{de.dob}</td>
                                    <td>{de.department}</td>
                                    <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {/* <button className="btn btn-success" onClick={() => navigate(`/admin-dashboard/editDepartment/${de._id}`)}>Edit</button> */}
                                        <button className="btn btn-success" onClick={() => navigate(`/admin-dashboard/employee/${de._id}`)} style={{ marginLeft: "10px" }}>View</button>
                                        <button className="btn btn-primary" onClick={() => navigate(`/admin-dashboard/editEmployee/${de._id}`)} style={{ marginLeft: "10px" }}>Edit</button>
                                        <button className="btn btn-danger" onClick={() => navigate(`/admin-dashboard/view-salary/${de._id}`)} style={{ marginLeft: "10px" }}>Salary</button>
                                        <button className="btn btn-warning" onClick={() => navigate(`/admin-dashboard/view-leave/${de._id}`)} style={{ marginLeft: "10px" }}>Leave</button>
                                    </td>
                                </tr>
                            ));
                        })()
                    )}
                </tbody>
            </table>
        </div>
    </div>

}
export default List_Employee;