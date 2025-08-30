import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const defaultAttendance = async (req, res, next) => {
    try {
        const date = new Date().toISOString().split('T')[0];
        const existingAttendance = await Attendance.find({ date });
        if (existingAttendance.length === 0) {
            const employees = await Employee.find({});
            const attendance = employees.map(employee => ({ date, employeeId: employee._id, status: null }));
            await Attendance.insertMany(attendance);
        } else {
            const employees = await Employee.find({});
            const existingEmployeeIds = existingAttendance.map(a => a.employeeId.toString());

            const missingEmployees = employees.filter(emp => !existingEmployeeIds.includes(emp._id.toString()));

            if (missingEmployees.length > 0) {
                const newAttendance = missingEmployees.map(employee => ({
                    date,
                    employeeId: employee._id,
                    status: null
                }));
                await Attendance.insertMany(newAttendance);
            }
        }
        next();
        }catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    };
    export default defaultAttendance;