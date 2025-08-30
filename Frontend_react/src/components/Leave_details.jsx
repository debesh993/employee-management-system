import image3 from "../assets/departments.png"
import "../styles/leave_details.css"
function Leave_details() {
    return (
        <div class="x">
            <div class="x511">
                <h2>Leave Details</h2>
            </div>
            <div class="x5">
                <div class="x11">
                    <div class="x1"><img src={image3} alt="total employees"></img></div>
                    <div class="x111">
                        <h3>Leave Applied</h3>
                        <h3>4</h3>
                    </div>
                </div>
                <div class="x12">
                    <div class="x2"><img src={image3} alt="total employees"></img></div>
                    <div class="x121">
                        <h3>Leave Approved</h3>
                        <h3>4</h3>
                    </div>
                </div>
                <div class="x13">
                    <div class="x3"><img src={image3} alt="total employees"></img></div>
                    <div class="x131">
                        <h3>Leave Pending</h3>
                        <h3>4</h3>
                    </div>
                </div>
                <div class="x14">
                    <div class="x4"><img src={image3} alt="total employees"></img></div>
                    <div class="x141">
                        <h3>Leave Rejected</h3>
                        <h3>4</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Leave_details;