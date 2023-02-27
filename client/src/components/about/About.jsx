import React from "react";
import { Link } from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
import me from "../../assets/burger2.png";
import "../../styles/about.css";

const About = () => {
  return (
    <section className="about-section">
      <main>
        <h2 className="about-heading">About Us</h2>
        <p className="about-content">Explore Various Types of Burger and Fries with great taste And Awesome feeling.</p>
        <p className="about-content">We Try our level best to provide you immense pleasure.</p>
        <Link to="/">
          <RiFindReplaceLine />
        </Link>
        <div>
          <img src={me} alt="Founder" />
          <h3>Burger Store</h3>
        </div>
      </main>
    </section>
  );
};

export default About;
