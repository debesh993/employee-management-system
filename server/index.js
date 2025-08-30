import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import salaryRouter from './routes/salary.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashBoardrouter from './routes/dashboard.js'
import attendanceRouter from './routes/attendance.js'
import connecttodatabase from './db/db.js'
import dotenv from "dotenv";
import path from "path";
dotenv.config();
connecttodatabase()

const app=express()
app.use(cors({
    origin:"https://employee-management-system-frontend-sand.vercel.app",
    credentials:true
}))
app.use(express.json())
// app.use("/uploads", express.static("public/uploads"))
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));
app.use('/api/auth',authRouter)
app.use('/api/department',departmentRouter)
app.use('/api/employee',employeeRouter)
app.use('/api/salary',salaryRouter)
app.use('/api/leave',leaveRouter)
app.use('/api/setting',settingRouter)
app.use('/api/dashboard',dashBoardrouter)
app.use('/api/attendance',attendanceRouter)


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
})