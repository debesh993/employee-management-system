import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addLeave,getLeaves,getLeave,getLeaveDetail,updateLeaves } from '../controllers/leaveController.js';

const router = express.Router();

router.post('/add', authMiddleware,addLeave);
router.get('/:id', authMiddleware,getLeaves);
router.get('/detail/:id', authMiddleware,getLeaveDetail);
router.get('/',authMiddleware,getLeave)
router.put('/:id', authMiddleware,updateLeaves);

export default router;
