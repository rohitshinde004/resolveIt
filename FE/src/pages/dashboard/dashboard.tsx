import { ComplaintCard } from "../../components/common/cards/complaintCard/complaintCard";
import { UserCard } from "../../components/common/cards/userCard/userCard";
import "./dashboard.scss";
interface Stats {
  title: string;
  value: number;
}
export const Dasboard = () => {
  const stats = [
    { title: "Total Complaints", value: 10 },
    { title: "Resolved Complaints", value: 5 },
  ];
  return (
    <div className="dashboardWrapper">
      <UserCard
        name={"Rohit Shinde"}
        role={"Admin"}
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
            <span className="headerText">Assigned Complaints</span>
            <span className="subHeadingText">
              View and manage complaints assigned to you
            </span>
          </div>
          <div className="complaintContainer">
            <div className="complaintCardWrapper">
              <ComplaintCard
                title={"#1234"}
                status={"InProgress"}
                area={"Pune"}
              />
              <ComplaintCard
                title={"#1234"}
                status={"InProgress"}
                area={"Pune"}
              />
              <ComplaintCard
                title={"#1234"}
                status={"InProgress"}
                area={"Pune"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
