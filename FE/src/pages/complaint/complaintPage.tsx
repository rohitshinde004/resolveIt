import Tabs from "@mui/material/Tabs";
import { CommonButton } from "../../components/common/commonButton/commonButton";
import { SearchField } from "../../components/common/textBox/searchField";
import "./complaintPage.scss";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const tabStyles = {
  "& .MuiTabs-indicator": {
    backgroundColor: "#FFC01D",
  },
  "& .MuiTab-root": {
    color: "black",
    minHeight: "36px",
    textTransform: "none",
    fontSize: "16px",
  },
  "& .Mui-selected": {
    color: "#FFC01D !important",
    "& .MuiSvgIcon-root": {
      fill: "#FFC01D",
    },
  },
};
export const ComplaintPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  return (
    <div className="complaintPageParent">
      <div className="headerWrapper">
        <span className="headingText">Complaints</span>
        <div className="searchBarButtonWrapper">
          <SearchField className="serachBar" />
          <CommonButton
            onClickCallBack={() => {navigate("/home/file-complaint")}}
            buttonLabel={"File Complaint"}
            className={"complaintBtn"}
          />
        </div>
      </div>
      <div className="complaitnContainer">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="styled tabs"
          sx={tabStyles}
        >
          <Tab
            className={"tabIcon"}
            label="In Progress"
            //   icon={<AddBoxIcon className="ticketIcon" />}
            iconPosition="start"
          />
          <Tab
            className={"tabIcon"}
            label="Pending"
            //   icon={<BookmarkIcon className="addTicketIcon" />}
            iconPosition="start"
          />
          <Tab
            className={"tabIcon"}
            label="Completed"
            //   icon={<BookmarkIcon className="addTicketIcon" />}
            iconPosition="start"
          />
        </Tabs>
      </div>
    </div>
  );
};
