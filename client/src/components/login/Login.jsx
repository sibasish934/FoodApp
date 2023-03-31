import React from "react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { backend_url } from "../../redux/store";

const Login = () => {
  const handleLogin = () =>{
    window.open(`${backend_url}/googleauth`, "_self");
  };
  
  return (
    <section className="login">
      <motion.button initial={{ y: "-100vh" }} animate={{ y: 0 }} onClick={handleLogin}>
        Login with Google
        <FcGoogle />
      </motion.button>
    </section>
  );
};

export default Login;
