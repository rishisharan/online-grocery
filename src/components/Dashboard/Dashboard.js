import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard page</h1>
      <p>
        <Link to="/items">Items page</Link>        
      </p>
    </>
  );
};

export default Dashboard;
