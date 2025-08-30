import "./App.css";
import Admin_dashboard_layout from "./components/Admin_dashboard_layout";
import Login from "./components/Login";
import { useAuth } from './context/AuthProvider';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import Dash_board_overview from "./components/Dash_board_overview";
import Card_information from "./components/Card_information";
import Department_information from "./components/Department_information";
import Add_new_department from "./components/Add_new_department";
import EditDepartment from "./components/EditDepartment";
import List_Employee from "./components/Employees/List_Employee";
import Add_employee from "./components/Employees/Add_employee";
import View_employee from "./components/Employees/View_employee";
import Edit_employee from "./components/Employees/Edit_employee";
import Add_salary from "./components/Employees/Add_salary";
import View_salary from "./components/Employees/View_salary";
import Employee_information from "./components/Employee_dashboard/Employee_information";
import Employee_pageLayout from "./components/Employee_dashboard/Employee_pageLayout";
import Employee_leaves from "./components/Employee_dashboard/Employee_leaves";
import Add_new_leave from "./components/Employee_dashboard/Add_new_leave";
import Setting from "./components/Employee_dashboard/Setting";
import Setting_1 from "./components/Employees/Setting_1";
import Leave_manage from "./components/Admin_leave/Leave_manage";
import Leave_detail from "./components/Admin_leave/Leave_detail";
import Attendence from "./components/Attendence/Attendance";
import Attendance_report from "./components/Attendence/Attendance_report";
import Attendance_employee from "./components/Employee_dashboard/Attendance_employee";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }


  const router = createBrowserRouter([
    {
      path: "/",
      element:
        user ? (
          user.role === 'admin' ? (
            <Navigate to='/admin-dashboard/dashboard' />
          ) : (
            <Navigate to='/employee-dashboard/dashboard' />
          )
        ) : (
          <Navigate to='/login' />
        ),
    },
    {
      path: "/admin-dashboard",
      element: user && user.role === "admin" ? (
        <Admin_dashboard_layout />
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          path: "dashboard",
          element: <Dash_board_overview />,
        },
        {
          path: "account",
          element: <Card_information />,
        },
        {
          path: "departments",
          element: <Department_information />,
        },
        {
          path: "add-new-department",
          element: <Add_new_department />
        },
        {
          path: "editDepartment/:id",   
          element: <EditDepartment />
        },
        {
          path:"employee-list",
          element:<List_Employee/>
        },
        {
          path:"add-new-employee",
          element:<Add_employee/>
        },
        {
          path:"employee/:id",
          element:<View_employee/>
        },
        {
          path:"editEmployee/:id",
          element:<Edit_employee/>
        },
        {
          path:"add-salary",
          element:<Add_salary/>
        },
        {
          path:"view-salary/:id",
          element:<View_salary/>
        },
        {
          path:"setting",
          element:<Setting_1/>
        },
        {
          path:"leave",
          element:<Leave_manage/>
        },
        {
          path:"leave/:id",
          element:<Leave_detail/>
        },
        {
          path:"view-leave/:id",
          element:<Employee_leaves/>
        },
        {
          path:"attendance",
          element:<Attendence/>
        },
        {
          path:"attendance-report",
          element:<Attendance_report/>
        }

      ],
    },
    {
      path: "/employee-dashboard",
      element: user && user.role !== "admin" ? (
        <Employee_pageLayout />
      ) : (
        <Navigate to="/" />
      ),
      children:[
        {
          path:"dashboard",
          element:<Employee_information/>
        },
        {
          path: "account",
          element: <Card_information />,
        },
        {
          path:"my-profile/:id",
          element:<View_employee/>
        },
        {
          path:"leave/:id",
          element:<Employee_leaves/>
        },
        {
          path:"add-new-leave",
          element:<Add_new_leave/>
        },
        {
          path:"salary/:id",
          element:<View_salary/>
        },
        {
          path:"setting",
          element:<Setting/>
        },
        {
          path:"attendence-report/:id",
          element:<Attendance_employee/>
        }
      ]
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
