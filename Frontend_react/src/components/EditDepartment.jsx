import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDepartment } from "../context/DepartmentList";

const EditDepartment=()=>{
    const {fetchDepartments}=useDepartment();
    const navigate=useNavigate();
    const {id}=useParams();
    const [department,setDepartment]=useState([])
    const [depLoading,setDepLoading]=useState(false)
    useEffect(()=>{
        const fetchDepartments1 = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    // console.log(response.data.success);
                    setDepartment(response.data.department);

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            } finally {
                setDepLoading(false);
            }
        }
        fetchDepartments1();
    },[])
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setDepartment({...department,[name]:value})
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.put(`http://localhost:5000/api/department/${id}`,department,{
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
    if (depLoading) {
        return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Loading...</h3>;
    }

    if (!department) {
        return <h3 style={{ textAlign: "center", marginTop: "2rem" }}>Department Not Found</h3>;
    }
    return (
        <div className="v9" style={{ height: "100%", width: "100%" ,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <div className="container" style={{width: "50%"}}>
                <div className="card">
                    <div className="card-header">
                        <p style={{ fontSize: "2vw", fontWeight: 900 }}>Edit Department</p>
                    </div>
                    <div className="card-body">
                        <form className="form-group" onSubmit={handlesubmit}>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="h">Department Name:</label>
                                    <input type="text" name="dep_name" onChange={handleChange} id="h" value={department.dep_name} className="form-control" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="h1">Description</label>
                                    <textarea name="description" id="h1" onChange={handleChange} value={department.description} className="form-control"></textarea>
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
                                    <button className="btn btn-success">Edit Department</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
export default EditDepartment;