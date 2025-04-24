import Tabs from "@mui/material/Tabs";
import { CommonButton } from "../../components/common/commonButton/commonButton";
import { SearchField } from "../../components/common/textBox/searchField";
import "./complaintPage.scss";
import Tab from "@mui/material/Tab";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComplaintsUrl } from "../../constant/apiUrls";
import Instance from "../../utils/axios";
import { ComplaintCard } from "../../components/common/cards/complaintCard/complaintCard";
import { Box, CircularProgress } from "@mui/material";
const userInfo: any = JSON.parse(localStorage.getItem("user") || "{}");

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
  const [complaintList, setComplaintList] = useState([]);
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  const handleInprogressTab = () => {
    setloader(true);
    console.log("userInfo.role ", userInfo.role);
    Instance(
      `${getComplaintsUrl}?status=inprogress${
        userInfo.role === "ADMIN"
          ? `&adminId=${userInfo._id}`
          : `&userId=${userInfo._id}`
      }`
    )
      .then((res) => {
        console.log(res.data);
        setComplaintList(res.data);
        setloader(false);
      })
      .catch((err) => {
        console.log(err);
        setloader(false);
      });
  };
  const handlePendingTab = () => {
    setloader(true);
    Instance(
      `${getComplaintsUrl}?status=pending${
        userInfo.role === "ADMIN"
          ? `&adminId=${userInfo._id}`
          : `&userId=${userInfo._id}`
      }`
    )
      .then((res) => {
        console.log(res.data);
        setComplaintList(res.data);
        setloader(false);
      })
      .catch((err) => {
        console.log(err);
        setloader(false);
      });
  };
  const handleResolveTab = () => {
    setloader(true);

    Instance(
      `${getComplaintsUrl}?status=completed${
        userInfo.role === "ADMIN"
          ? `&adminId=${userInfo._id}`
          : `&userId=${userInfo._id}`
      }`
    )
      .then((res) => {
        console.log(res.data);
        setComplaintList(res.data);
        setloader(false);
      })
      .catch((err) => {
        console.log(err);
        setloader(false);
      });
  };

  useEffect(() => {
    handleInprogressTab();
  }, []);
  return (
    <div className="complaintPageParent">
      <div className="headerWrapper">
        <span className="headingText">Complaints</span>
        <div className="searchBarButtonWrapper">
          <SearchField className="serachBar" />
          <CommonButton
            onClickCallBack={() => {
              navigate("/home/file-complaint");
            }}
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
            onClick={handleInprogressTab}
          />
          <Tab
            className={"tabIcon"}
            label="Pending"
            //   icon={<BookmarkIcon className="addTicketIcon" />}
            iconPosition="start"
            onClick={handlePendingTab}
          />
          <Tab
            className={"tabIcon"}
            label="Resolved"
            //   icon={<BookmarkIcon className="addTicketIcon" />}
            iconPosition="start"
            onClick={handleResolveTab}
          />
        </Tabs>
      </div>
      <div
        className="complaintContainer"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {complaintList.length > 0 ? (
          complaintList.map((complaint: any) => {
            return (
              <ComplaintCard
                key={complaint.id}
                title={`#${complaint.id}`}
                status={complaint.status}
                area={complaint.location}
                onClick={() => {
                  navigate(`/home/complaint-details?id=${complaint.id}`);
                }}
              />
            );
          })
        ) : (
          <div
            className="noComplaintWrapper"
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
            }}
          >
            {loader ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100%"
              >
                <CircularProgress
                  style={{ color: "#ffc01d", minHeight: "100%" }}
                />
              </Box>
            ) : (
              <span>No Complaints</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
