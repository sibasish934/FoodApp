import React, { useState } from "react";
import { motion } from "framer-motion";
import burger from "../../assets/burger2.png";

const Contact = () => {
  const [data,  setData] = useState({
    name:"",
    email:"",
    message:"",
  })

  const handlechange =(e)=>{
    e.preventDefault();
    const {name, value} = e.target;
    setData({...data, [name]:value});
  }
  return (
    <section className="contact">
      <motion.form
        action='https://formspree.io/f/myyvnkjl'
        method='POST'
        initial={{
          x: "-100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.2 }}
        
      >
        <h2>Contact Us</h2>
        <input type="text" placeholder="Name" name="name" value={data.name} onChange={handlechange} required/>
        <input type="email" placeholder="Email" name="email" value={data.email} onChange={handlechange} autoComplete="off" required/>

        <textarea placeholder="Message..." cols="30" rows="10" name="message" value={data.message} onChange={handlechange}></textarea>

        <button type="submit">Send</button>
      </motion.form>

      <motion.div
        className="formBorder"
        initial={{
          x: "100vw",
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          initial={{
            y: "-100vh",
            x: "50%",
            opacity: 0,
          }}
          animate={{
            x: "50%",
            y: "-50%",
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
        >
          <img src={burger} alt="Burger" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
