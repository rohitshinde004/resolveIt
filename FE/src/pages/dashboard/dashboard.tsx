import { ComplaintCard } from "../../components/common/cards/complaintCard/complaintCard";
import { UserCard } from "../../components/common/cards/userCard/userCard";
import { useEffect, useState } from "react";
import "./dashboard.scss";
import Instance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { getComplaintsUrl } from "../../constant/apiUrls";

interface Stats {
  title: string;
  value: number;
}

export const Dasboard = () => {
  const userInfo: any = JSON.parse(localStorage.getItem("user") || "{}");
  const [complaints, setComplaints] = useState([]);
  const [doneComplaints, setDoneComplaints] = useState([]);
  const navigate = useNavigate();

  const handleResolveTab = () => {
    Instance(
      `${getComplaintsUrl}?status=completed${
        userInfo.role === "ADMIN"
          ? `&adminId=${userInfo._id}`
          : `&userId=${userInfo._id}`
      }`
    )
      .then((res) => {
        console.log(res.data);
        setDoneComplaints(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await Instance.get(`complaint/user/${userInfo._id}`);
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
    handleResolveTab();
  }, []);

  const stats = [
    { title: "Total Complaints", value: complaints.length },
    { title: "Resolved Complaints", value: doneComplaints.length },
  ];

  return (
    <div className="dashboardWrapper">
      <UserCard
        name={userInfo.firstName + " " + userInfo.lastName}
        role={userInfo.role}
        avtar={
          "https://m.media-amazon.com/images/I/61qFXFR1nnL._AC_UY1100_.jpg"
        }
      />

      <div className="containWrapper">
        <div className="statsWrapper">
          <div className="headerWrapper">
            <span className="headerText">Complaint Statistics</span>
            <span className="subHeadingText">
              Overview of complaint metrics
            </span>
          </div>
          <div className="statsCardWrapper">
            {stats.map((value: Stats, index: any) => {
              return (
                <div className="statsCard" key={index}>
                  <span className="cardHeader">{value.title}</span>
                  <span className="cardValue">{value.value}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="assigneeWrapper">
          <div className="headerWrapper">
            <span className="headerText">
              {userInfo.role === "ADMIN"
                ? "Assigned Complaints"
                : "Filed Complaints"}
            </span>
            <span className="subHeadingText">
              View and manage complaints assigned to you
            </span>
          </div>
          <div className="complaintContainer">
            <div className="complaintCardWrapper">
              {complaints.map(
                (complaint: any) => (
                  console.log("complaint", complaint),
                  (
                    <ComplaintCard
                      key={complaint.id}
                      title={`#${complaint.id}`}
                      status={complaint.status}
                      area={complaint.location}
                      onClick={() => {
                        navigate(`/home/complaint-details?id=${complaint.id}`);
                      }}
                    />
                  )
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
