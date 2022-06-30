import { Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/users/userSlice";
import styles from "./profile.module.css";

const Profile = ({ username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className={styles.profileContainer}>
      <DropdownButton
        variant=""
        title={
          <span className={styles.userNameStyle}>{`${
            username && username
          }`}</span>
        }
      >
        <Dropdown.Item href="#/action-1">
          {" "}
          <i className={`fa-solid fa-user ${styles.profileIcon}`}></i>
          <span className={styles.myProfileStyle}> My Profile</span>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          {" "}
          <i className={`fa-solid fa-message ${styles.profileIcon}`}></i>
          <span className={styles.myProfileStyle}> Group Chat</span>
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          <i
            style={{ marginRight: "10px", color: "red", fontSize: "0.8rem" }}
            className={`fa-solid fa-arrow-right-from-bracket ${styles.profileIcon}`}
          ></i>
          <span style={{ color: "red", fontSize: "0.8rem" }}>Logout</span>
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
export default Profile;
