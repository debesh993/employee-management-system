import Nav_bar from "./Nav_bar";
import "../styles/Admin_dashboard_layout.css";
import Dash_board from "./Dash_board";

import { Outlet } from "react-router-dom";

const Admin_dashboard_layout=()=>{
    return(
        <div className="g">
            <Nav_bar/>
            <div className="content">
                <Dash_board/>
                <div id="dash21">
                    <Outlet/>
                </div>
            </div>
        </div>
        
    )
}
export default Admin_dashboard_layout;