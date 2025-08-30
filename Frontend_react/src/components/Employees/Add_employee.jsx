import axios from "axios";
import { useDepartment } from "../../context/DepartmentList";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Add_employee = () => {
    const navigate=useNavigate();
    const { departments } = useDepartment();
    const [formData, setFormData] = useState({})
    // console.log(departments);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((prevData) => ({ ...prevData, [name]: files[0] }))
        } else {
            setFormData((prevData) => ({ ...prevData, [name]: value }))
        }
    }
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                alert("File must be less than 1 MB");
                e.target.value = null;
            }
            // else {
            //     console.log("Selected file:", file);
            // }
        }
    }

    const handleSubmit=async(e)=>{
        // console.log("handlesubmit is running");
        e.preventDefault();
        // console.log("Form data before submit:", formData);
        const formDataObj=new FormData();
        Object.keys(formData).forEach((key)=>{
            formDataObj.append(key,formData[key]);
        });
        try{
            const response=await axios.post('https://employee-management-system-api.vercel.app/api/employee/add',formDataObj,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(response.data.success);
            if(response.data.success){
                navigate("/admin-dashboard/employee-list")
            }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <p style={{ fontSize: "2vw", fontWeight: 900 }}>Add New Employee</p>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="empName">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleChange}
                                    id="empName"
                                    placeholder="Insert name"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="empEmail">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    id="empEmail"
                                    placeholder="Insert email"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label htmlFor="empId">Employee ID</label>
                                <input
                                    type="String"
                                    name="employeeId"
                                    onChange={handleChange}
                                    id="empId"
                                    placeholder="Employee ID"
                                    className="form-control"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    onChange={handleChange}
                                    id="dob"
                                    className="form-control"
                                    required
                                />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="gender">Gender</label>
                                <select name="gender" onChange={handleChange} id="gender" defaultValue="" className="form-control" required>
                                    <option value="" disabled >
                                        Select Gender
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="maritalStatus">Marital Status</label>
                                <select name="maritalStatus" onChange={handleChange} id="maritalStatus" defaultValue="" className="form-control" required>
                                    <option value="" disabled >
                                        Select Status
                                    </option>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label htmlFor="designation">Designation</label>
                                <input
                                    type="text"
                                    name="designation"
                                    onChange={handleChange}
                                    id="designation"
                                    className="form-control"
                                    placeholder="Designation"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="department">Department</label>
                                <select name="department" onChange={handleChange} id="department" className="form-control" defaultValue="" required>
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
                        </div>

                        <div className="row ">
                            <div className="col">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="number"
                                    name="salary"
                                    onChange={handleChange}
                                    id="salary"
                                    className="form-control"
                                    placeholder="Salary"
                                    required
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    id="password"
                                    className="form-control"
                                    placeholder="*********"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="role">Role</label>
                                <select name="role" onChange={handleChange} id="role" defaultValue="" className="form-control" required>
                                    <option value="" disabled >
                                        Select Role
                                    </option>
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="col">
                                <div className="col">
                                    <label htmlFor="profileImage">Upload Image</label>
                                    <input
                                        type="file"
                                        id="profileImage"
                                        name="image"
                                        onChange={(e) => {
                                            handleChange(e);
                                            handleImage(e);
                                        }}

                                        accept="image/*"
                                        className="form-control"

                                    />
                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                                <button style={{ marginTop: '10px' }} type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Add_employee;
