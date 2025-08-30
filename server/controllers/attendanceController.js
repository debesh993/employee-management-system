import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

const getAttendance = async (req, res) => {

    try {
        const date = new Date().toISOString().split('T')[0];
        const attendance = await Attendance.find({ date }).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        })
        return res.status(200).json({ success: true, attendance })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
const updateAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params
        const { status } = req.body;
        const date = new Date().toISOString().split('T')[0];
        const employee = await Employee.findOne({ employeeId })
        const attendance = await Attendance.findOneAndUpdate({ employeeId: employee._id, date }, { status }, { new: true })
        return res.status(200).json({ success: true, attendance })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const attendanceReport = async (req, res) => {
    try {
        const { date, limit = 5, skip = 0 } = req.query;
        const query = {};
        if (date) {
            query.date = date;
        }
        const attendanceData = await Attendance.find(query).populate({
            path: "employeeId",
            populate: [
                "department",
                "userId"
            ]
        }).sort({ date: -1 }).limit(parseInt(limit))
        const groupData = attendanceData.reduce((result, record) => {
            if (!result[record.date]) {
                result[record.date] = []
            }
            result[record.date].push({
                employeeId: record.employeeId.employeeId,
                employeeName: record.employeeId.userId.name,
                departmentName: record.employeeId.department.dep_name,
                status: record.status || "Not Marked"
            })
            return result;
        }, {})
        return res.status(201).json({ success: true, groupData })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Attendance report getting server error" })
    }
}
const attendanceReportEmployee = async (req, res) => {
    try {
        const { date, limit = 5, skip = 0, id } = req.query;

        if (!id) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }
        const employee = await Employee.findOne({ userId: id });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        const query = { employeeId: employee._id };

        if (date) {
            query.date = date;
        } else {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            query.date = {
                $gte: firstDayOfMonth.toISOString().split("T")[0],
                $lte: lastDayOfMonth.toISOString().split("T")[0]
            };
        }

        const attendanceData = await Attendance.find(query)
            .populate({
                path: "employeeId",
                populate: ["department", "userId"],
            })
            .sort({ date: -1 })
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        const groupData = attendanceData.reduce((result, record) => {
            if (!result[record.date]) {
                result[record.date] = [];
            }
            result[record.date].push({
                employeeId: record.employeeId.employeeId,
                employeeName: record.employeeId.userId.name,
                departmentName: record.employeeId.department.dep_name,
                status: record.status || "Not Marked",
            });
            return result;
        }, {});

        return res.status(200).json({ success: true, groupData });
    } catch (error) {
        console.error("Attendance report error:", error);
        return res.status(500).json({
            success: false,
            message: "Attendance report getting server error",
        });
    }
};

export { getAttendance, updateAttendance, attendanceReport, attendanceReportEmployee };