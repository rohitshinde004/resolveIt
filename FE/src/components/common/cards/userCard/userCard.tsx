import "./userCard.scss";

interface UserPropsInterface {
  name: string;
  role: string;
  avtar: string;
}
export const UserCard = (props: UserPropsInterface) => {
  const { name, role, avtar } = props;
  return (
    <div className="userCardWrapper">
      <div className="avtarWrapper">
        <img src={avtar} alt="avtar" className="avtar" />
      </div>
      <div className="userDetailsWrapper">
        <div className="userName">{name}</div>
        <div className="role">{role}</div>
        <span className="welcomeText">
          Welcome to the Complaint Management System!
        </span>
      </div>
    </div>
  );
};
