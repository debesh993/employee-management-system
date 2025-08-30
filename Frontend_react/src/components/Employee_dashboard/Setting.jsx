import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider";
import { useState } from "react";
import axios from "axios";

const Setting = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [error, setError] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (setting.newPassword !== setting.confirmPassword) {
            setError("Password Not Match");
        } else {
            try {
                const response = await axios.put("http://localhost:5000/api/setting/change-password", setting, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.success) {
                    navigate("/admin-dashboard/dashboard");
                    setError("")
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error)
                }
            }
        }
    }
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "50%", height: "61%"}}>
                <div className="card">
                    <div className="card-header">
                        <p style={{ display: "flex", justifyContent: "center", fontSize: "2vw", fontWeight: 900 }}>Setting</p>
                    </div>
                    {error && (
                        <div className="alert alert-danger text-center mt-2">
                            {error}
                        </div>
                    )}
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col">

                                    <label htmlFor="password1">Old Password</label>
                                    <input type="password" name="oldPassword" placeholder="Old Password" id="password1" onChange={handleChange} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">

                                    <label htmlFor="password11">New Password</label>
                                    <input type="password" name="newPassword" placeholder="New Password" id="password11" onChange={handleChange} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">

                                    <label htmlFor="password2">Confirm Password</label>
                                    <input type="password" name="confirmPassword" placeholder="Confirm Password" id="password2" onChange={handleChange} className="form-control" required />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col" style={{ display: "flex", justifyContent: "center" }}>
                                    <button style={{ marginTop: '10px' }} type="submit" className="btn btn-primary">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Setting;