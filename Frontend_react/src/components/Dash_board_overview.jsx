import image1 from "../assets/employees.png"
import image2 from "../assets/departments.png"
import image3 from "../assets/salary.png"
import image4 from "../assets/calender.png"
import image5 from "../assets/currency.png"
import "../styles/dash_board_overview.css"
import { useEffect, useState } from "react"
import axios from "axios"
function Dash_board_overview() {

    const [summary,setSummary]=useState(null);

    useEffect(()=>{
        const fetchSummary=async()=>{
            try{
                 const summary=await axios.get('https://employee-management-system-api.vercel.app/api/dashboard/summary',{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                 })
                //  console.log(summary)
                 setSummary(summary.data);
            }catch(error){
               if(error.response){
                alert(error.response.data.error);
               }
               console.log(error.message)
            }
        }
        fetchSummary();
    },[])
    if(!summary){
        return <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}><div>Loading...</div></div>
    }
    return (<div id="dash2">
                <div className="dashboard">
                    <h2 className="j">Dashboard Overview</h2>
                    <ul className="l">
                        <li><img src={image1}/><div>Total Employees<h2>{summary.totalEmployee}</h2></div></li>
                        <li><img src={image2} /><div>Total Departments<h2>{summary.totalDepartments}</h2></div></li>
                        <li><img src={image5} /><div>Monthly Pay<h2>Rs.{summary.totalSalary} </h2></div></li>
                    </ul>
                </div>

                <div className="dashboard2">
                    <h2 className="j1">Leave Details</h2>
                    <ul className="l1">
                        <li><img src={image4} /><div>Leave Applied<h2>{summary.leaveSummary.appliedFor}</h2></div></li>
                        <li><img src={image4} /><div>leave Approved<h2>{summary.leaveSummary.approved}</h2></div></li>
                        <li><img src={image4} /><div>Leave Pending<h2>{summary.leaveSummary.pending}</h2></div></li>
                        <li><img src={image4} /><div>Leave Rejected<h2>{summary.leaveSummary.rejected}</h2></div></li>
                    </ul>
                </div>

            </div>)
}
export default Dash_board_overview;