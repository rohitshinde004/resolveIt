import { CommonButton } from "../common/commonButton/commonButton";
import "./header.scss";

export const Header = () => {
  return (
    <div className="headerContainer">
      <div className="logoTextWrapper">
        <img src="" alt="" className="avtar" />
        <span className="headerText">ResolveIt</span>
      </div>
      <div className="buttonWrapper">
        <CommonButton
          onClickCallBack={() => {}}
          buttonLabel={"Log Out"}
          className={"logOutBtn"}
        />
      </div>
    </div>
  );
};
