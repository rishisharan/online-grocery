import { Link } from "react-router-dom";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard page</h1>
      <Link to="/itemPage" className={classes["tile-content"]}>
        <div className={classes["tile-container"]}>Items</div>
      </Link>
      <Link to="/orders" className={classes["tile-content"]}>
        <div className={classes["tile-container"]}>Orders</div>
      </Link>
      <Link to="/itemPage" className={classes["tile-content"]}>
        <div className={classes["tile-container"]}>Employees</div>
      </Link>
      <Link to="/itemPage" className={classes["tile-content"]}>
        <div className={classes["tile-container"]}>Customers</div>
      </Link>
    </>
  );
};

export default Dashboard;
