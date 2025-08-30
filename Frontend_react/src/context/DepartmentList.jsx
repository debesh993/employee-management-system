import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useAuth } from "./AuthProvider";
const userContext = createContext()
const DepartmentList = ({ children }) => {
    const [departments, setDepartments] = useState([])
    const [depLoading, setDepLoading] = useState(false)
    const {user,loading}=useAuth();
        const fetchDepartments = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get('https://employee-management-system-api.vercel.app/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    const data = await response.data.departments;
                    // console.log("Fetched departments:", data);
                    setDepartments(data);

                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    console.log(error.response.data.error)
                }
            } finally {
                setDepLoading(false);
            }
        }
        useEffect(() => {
            if(!loading && user){
                fetchDepartments();
            }
        }, [loading,user]);
        if(loading){
            return null;
        }
        return (<userContext.Provider value={{ departments, depLoading,fetchDepartments,setDepartments }}>
            {children}
        </userContext.Provider>)
    }
    export const useDepartment = () => useContext(userContext);
    export default DepartmentList;