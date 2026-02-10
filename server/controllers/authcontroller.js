
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user) {
            return res.status(404).json({ success: false, error: "User not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, error: "Wrong Password" });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: "10d" }
        );

        return res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name,email: user.email, role: user.role }
        });
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};
const verify=(req,res)=>{
    return res.status(200).json({success:true,user:req.user})
}
export { login,verify };
