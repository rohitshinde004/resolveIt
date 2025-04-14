import { useNavigate } from "react-router-dom";
import { CommonButton } from "../common/commonButton/commonButton";
import "./header.scss";

export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <div className="headerContainer">
      <div className="logoTextWrapper">
        <img src="" alt="" className="avtar" />
        <span className="headerText">ResolveIt</span>
      </div>
      <div className="buttonWrapper">
        <CommonButton
          onClickCallBack={handleLogout}
          buttonLabel={"Log Out"}
          className={"logOutBtn"}
        />
      </div>
    </div>
  );
};
