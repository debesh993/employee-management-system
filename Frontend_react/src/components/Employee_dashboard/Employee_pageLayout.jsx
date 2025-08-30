import "../../styles/Admin_dashboard_layout.css";

import { Outlet } from "react-router-dom";
import Nav_bar2 from "./Nav_bar2";
import Side_bar from "./Side_bar";

const Employee_pageLayout=()=>{
    return(
        <div className="g">
            <Nav_bar2/>
            <div className="content">
                <Side_bar/>
                <div id="dash21">
                    <Outlet/>
                </div>
            </div>
        </div>
        
    )
}
export default Employee_pageLayout;