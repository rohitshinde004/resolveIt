import dasboardIcon from "../../assets/icons/dashboardIcon.svg";
import complaintIcon from "../../assets/icons/comlaintIcon.svg";
import PostAddIcon from '@mui/icons-material/PostAdd';
import "./sidebar.scss";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Sidebar Component
const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navItems, setNavItems] = useState([
    {
      text: "Dashboard",
      icon: <img src={dasboardIcon} alt="icon" style={{ height: "22px" }} />,
      navigator: "home/dashboard",
      selected: false,
    },
    {
      text: "Complaint",
      icon: <img src={complaintIcon} alt="icon" style={{ height: "22px" }} />,
      navigator: "home/complaint",
      selected: false,
    },
    {
      text: "File Complaint",
      icon: <PostAddIcon style={{ fontSize: "22px",color:'black' }} />,
      navigator: "home/file-complaint",
      selected: false,
    },
  ]);

  useEffect(() => {
    const path = location.pathname.replace(/^\//, ""); // Remove leading slash

    setNavItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        selected: path.startsWith(item.navigator), // Match navigator with the start of the path
      }))
    );
  }, [location]);

  const handleNavigation = (nav: string) => {
    navigate(`/${nav}`);
  };


  return (
    <div
      style={{
        width: 230,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid #ddd",
        padding: "1rem 0",
        height: "calc(100% - 2rem)",
      }}
    >
      <List sx={{ height: "80%" }}>
        {navItems.map((item, index) => (
          <ListItemButton
            key={index}
            onClick={() => handleNavigation(item.navigator)}
            sx={{ height: "60px", padding: "10px 20px" }}
            className={item.selected ? "selectedItem" : ""}
          >
            <ListItemIcon className={item.selected ? "selectedIcon" : ""}>
              {item.icon}
            </ListItemIcon>
            <span
              style={{ fontSize: "16px", fontFamily: "montserratMedium" }}
              className={item.selected ? "selectedText" : ""}
            >
              {item.text}
            </span>
          </ListItemButton>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
