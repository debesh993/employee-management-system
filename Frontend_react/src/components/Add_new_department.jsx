import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDepartment } from "../context/DepartmentList";

const Add_new_department = () => {
    const {fetchDepartments}=useDepartment()
    const [department,setDepartment]=useState({
        dep_name:'',
        description:''
    })
    const navigate=useNavigate();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setDepartment({...department,[name]:value})
    }
    const handlesubmit= async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post('https://employee-management-system-api.vercel.app/api/department/add',department,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data.success);
            if(response.data.success){
                await fetchDepartments();
                navigate("/admin-dashboard/departments")
            }
        }catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }
    return (
        <div className="v9" style={{ height: "100%", width: "100%" ,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div className="container" style={{width: "50%"}}>
                <div className="card">
                    <div className="card-header">
                        <p style={{ fontSize: "2vw", fontWeight: 900 }}>Add New Department</p>
                    </div>
                    <div className="card-body">
                        <form  onSubmit={handlesubmit}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="h">Department Name:</label>
                                    <input type="text" name="dep_name" onChange={handleChange} id="h" className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="h1">Description</label>
                                    <textarea name="description" id="h1" onChange={handleChange} className="form-control"></textarea>
                                </div>
                            </div>
                            <div className="row">
                                <div
                                    className="col"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        marginTop: "10px"
                                    }}
                                >
                                    <button className="btn btn-success">Add Department</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Add_new_department;