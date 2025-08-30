import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import image1 from"../../assets/image_avatar.png";
import axios from "axios";


const View_employee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null)
    useEffect(() => {
        const fetchEmployee = async () => {

            try {
                const response = await axios.get(`https://employee-management-system-api.vercel.app/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                // console.log(response.data.employees);
                if (response.data.success) {
                    // console.log(response.data.success);
                    const data=await response.data.employees;
                    setEmployee(data);

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            }
        }
        fetchEmployee();
    }, [])
    // if (!employee) return <div>Loading...</div>;
    return (
        <div className="container">
            {!employee ?<div >Loading...</div>:(
            <div className="card">
                <div className="card-header">
                    <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>Employee Details</p>
                </div>
                <div className="card-body" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div>
                        <img
                            src={employee.userId.profileimage ? `https://employee-management-system-api.vercel.app/uploads/${employee.userId.profileimage}` : image1}
                            alt="Employee"
                            style={{ width: "19vw", height: "19vw", objectFit: "cover", borderRadius: "50%" }}

                        />
                    </div>
                    <div style={{fontWeight: 700}}>
                        <p>Name : {employee.userId.name}</p>
                        <p>Employee Id : {employee.employeeId}</p>
                        <p>Date Of Birth : {new Date(employee.dob).toISOString().split("T")[0]}</p>
                        <p>Gender : {employee.gender}</p>
                        <p>Department : {employee.department.dep_name}</p>
                        <p>Marital Status : {employee.maritalStatus}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
export default View_employee;