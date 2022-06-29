import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/users/userSlice";


const Profile =({username})=>{
const dispatch=useDispatch()
const navigate = useNavigate();

  return(
    <div style={{ marginTop: "2%" }}>
                <DropdownButton variant="" title={<span style={{color:"black",fontWeight:"bold",fontSize:"0.9rem" ,marginRight:"10%"}}>{`${username&&username}`}</span>} >
                  <Dropdown.Item href="#/action-1">
                    {" "}
                    <i
                      style={{ marginRight: "10px" ,fontSize:"0.8rem"}}
                      className="fa-solid fa-user"
                    ></i>
                    <span style={{fontSize:"0.8rem"}}>  My Profile</span>
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    {" "}
                    <i
                      style={{ marginRight: "10px" ,fontSize:"0.8rem" }}
                      className="fa-solid fa-message"
                    ></i>
                    <span style={{fontSize:"0.8rem"}}> Group Chat</span>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item 
                  onClick={()=>{
                    dispatch(logout());
                    navigate("/")
                  }}
                  >
                    <i
                      style={{ marginRight: "10px", color: "red" ,fontSize:"0.8rem"}}
                      className="fa-solid fa-arrow-right-from-bracket"
                    ></i>
                    <span style={{ color: "red" ,fontSize:"0.8rem" }}>Logout</span>
                  </Dropdown.Item>
                </DropdownButton>
              </div>
)
}
export default Profile