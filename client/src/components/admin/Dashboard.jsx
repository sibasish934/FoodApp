import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import Loader from "../layout/Loader";
import {useDispatch, useSelector} from "react-redux";
import { getOrdersDetails } from "../../redux/actions/admin"

ChartJS.register(Tooltip, ArcElement, Legend);

// const loading = true;

const Box = ({ title, value }) => (
  <div>
    <h3>
      {title === "Income" && "₹"}
      {value}
    </h3>
    <p>{title}</p>
  </div>
);

const Dashboard = () => {

  const {loading, userCount, ordersCount, amount } = useSelector(state => state.admin)

  const dispatch = useDispatch();
  useEffect(() => {
     dispatch(getOrdersDetails())
  }, [dispatch])
  
  const data = {
    labels: ["Preparing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "# of orders",
        data: ordersCount ? [ordersCount.preparing, ordersCount.shipped, ordersCount.delivered]:[0, 0, 0],
        backgroundColor: [
          "rgba(159,63,176,0.1)",
          "rgba(78,63,176,0.2)",
          "rgba(156,0,60,0.3)",
        ],
        borderColor: ["rgb(159,63,176)", "rgb(78,63,176)", "rgb(156,0,60)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="dashboard">
      {loading === false ? (
        <main>
          <article>
            <Box title="Users" value={userCount} />
            <Box title="Orders" value={ordersCount.total} />
            <Box title="Income" value={amount} />
          </article>

          <section>
            <div>
              <Link to="/admin/orders">View Orders</Link>
              <Link to="/admin/users">View Users</Link>
            </div>

            <aside>
              <Doughnut data={data} />
            </aside>
          </section>
        </main>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Dashboard;
