import Department from "../models/Department.js";
import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js";

const getSummary=async(req,res)=>{
    try{
        const totalEmployee=await Employee.countDocuments();
        const totalDepartments=await Department.countDocuments();
        const totalSalaries=await Employee.aggregate([
            {$group:{_id:null,totalsalary:{$sum:"$salary"}}}
        ])
        const employeeAppliedForLeave=await Leave.distinct('employeeId')
        const leaveStatus=await Leave.aggregate([
            {$group:{
                _id:"$status",
                count:{$sum:1}
            }}
        ])
        const leaveSummary={
            appliedFor:employeeAppliedForLeave.length,
            approved:leaveStatus.find(i=>i._id==="Approved")?.count||0,
            rejected:leaveStatus.find(i=>i._id==="Rejected")?.count||0,
            pending:leaveStatus.find(i=>i._id==="Pending")?.count||0,
        }
        return res.status(200).json({
            success:true,
            totalEmployee,
            totalDepartments,
            totalSalary:totalSalaries[0]?.totalsalary ||0,
            leaveSummary
        })

    }catch{
        return res.status(500).json({success:false,error:"dashboard summary error"})
    }
}
export {getSummary}