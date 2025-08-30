
import { useNavigate } from "react-router-dom";
import { useDepartment } from "../context/DepartmentList";
import axios from "axios";
import { useState } from "react";

const Department_information = () => {
    const navigate = useNavigate();
    const { departments, depLoading, setDepartments } = useDepartment();
    const [filterDepartments, setfilterDepartments] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    // console.log(departments);

    const onDepartmentDelete = async (id) => {
        const data = departments.filter(dep => dep._id !== id)
        setDepartments(data);
    }
    const handleadd = () => {
        navigate("/admin-dashboard/add-new-department")
    }
    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you wnat to delete?")
        if (confirm) {
            try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    // console.log(response.data.success);
                    onDepartmentDelete(id);

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            }
        }
    }
    const filterDepartment = async (e) => {
        const keyword = e.target.value;
        setSearchTerm(keyword);

        // if (keyword.trim() === "") {
        //     setfilterDepartments([]);
        // }
        const records = departments.filter((dep) =>
            dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setfilterDepartments(records)
    }


    return (
        <div className="container">
            <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>
                Manage Departments
            </p>
            <div className="search" style={{ display: "flex", justifyContent: "space-between" }}>
                <input type="text" style={{marginBottom:"5px"}} placeholder="Search by Department" onChange={filterDepartment} />
                <button style={{marginBottom:"5px"}} onClick={handleadd} className="btn btn-success">Add New Department</button>
            </div>
            <div style={{ height: "433px", overflow: "auto" }}>
                <table className="table table-bordered table-hover" >
                    <thead className="bg-primary text-white sticky-top" >
                        <tr>
                            <th>S No</th>
                            <th>Departments</th>
                            <th style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody id="information">
                        {depLoading  ? (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>Loading...</td>
                            </tr>
                        ) : (
                            (() => {
                                const dataToShow = searchTerm.trim() === "" ? departments : filterDepartments;

                                if (dataToShow.length === 0) {
                                    return (
                                        <tr>
                                            <td colSpan="3" style={{ textAlign: "center" }}>No Departments Found</td>
                                        </tr>
                                    );
                                }

                                return dataToShow.map((de, index) => (
                                    <tr key={de._id || index}>
                                        <td>{index + 1}</td>
                                        <td>{de.dep_name}</td>
                                        <td style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <button className="btn btn-success" onClick={() => navigate(`/admin-dashboard/editDepartment/${de._id}`)}>Edit</button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(de._id)} style={{ marginLeft: "10px" }}>Delete</button>
                                        </td>
                                    </tr>
                                ));
                            })()
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Department_information;
