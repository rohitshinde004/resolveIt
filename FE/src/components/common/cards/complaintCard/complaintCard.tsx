import "./complaintCard.scss";
import complaintImg from "../../../../assets/images/complaintImg.png";
interface ComplaintPropsInterface {
  title: string;
  description?: string;
  status: string;
  date?: string;
  area: string;
}

export const ComplaintCard = (props: ComplaintPropsInterface) => {
  const { title, description, status, date, area } = props;
  return (
    <div className="complaintCardParent">
      <div className="imageWrapper">
        <img src={complaintImg} alt="" className="complaintImg" />
      </div>
      <div className="complaintDetailsWrapper">
        <span className="complaintTitle">Complaint ID: {title}</span>
        <span className="complaintArea">Loaction: {area}</span>
        <span className="complaintStatus">{status}</span>
      </div>
    </div>
  );
};
