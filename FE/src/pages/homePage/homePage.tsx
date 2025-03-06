import { Outlet } from "react-router-dom";
import { Header } from "../../components/header/header";
import Sidebar from "../../components/sidebar/sidebar";
import "./homePage.scss";

export const HomePage = () => {
  return (
    <div className="parentContainer">
      <div className="headerParent">
        <Header />
      </div>
      <div className="containerWrapper">
        <Sidebar />
        <div className="contentWrapper">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
