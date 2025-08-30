import express from 'express'
import { getAttendance,updateAttendance,attendanceReport,attendanceReportEmployee } from '../controllers/attendanceController.js';
import authMiddleware from '../middleware/authMiddleware.js'
import defaultAttendance from '../middleware/defaultAttendance.js'

const router=express.Router()
router.get('/',authMiddleware,defaultAttendance,getAttendance)
router.put('/update/:employeeId',authMiddleware,updateAttendance)
router.get('/report',authMiddleware,attendanceReport)
router.get('/report/employee',authMiddleware,attendanceReportEmployee)

export default router;
