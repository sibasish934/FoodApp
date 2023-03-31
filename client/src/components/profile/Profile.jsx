import React from "react";
import { motion } from "framer-motion";
// import me from "../../assets/user.png";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/actions/user";

const Profile = (props) => {
  const options = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <section className="profile">
      <main>
        <motion.img src={props.user.photo} alt="User" {...options} />
        <motion.h5 {...options} transition={{ delay: 0.3 }}>
          {props.user.name}
        </motion.h5>

        {props.user.role === "admin" && (
          <motion.div {...options} transition={{ delay: 0.5 }}>
            <Link
              to="/admin/dashboard"
              style={{
                borderRadius: 0,
                backgroundColor: "rgb(40,40,40)",
              }}
            >
              <MdDashboard /> Dashboard
            </Link>
          </motion.div>
        )}

        <motion.div
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
        >
          <Link to="/myorders">Orders</Link>
        </motion.div>

        <motion.button
          initial={{
            x: "-100vw",
            opacity: 0,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
          onClick={handleClick}
        >
          Logout
        </motion.button>
      </main>
    </section>
  );
};

export default Profile;
