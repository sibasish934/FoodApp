import React from "react";
import { AiFillInstagram, AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div>
        <h2>Burger Store</h2>

        <p>We are trying to give you the best taste possible.</p>
        <br />

        <em>We give attention to genuine feedback.</em>

        <strong>All right received @BurgerStore</strong>
      </div>

      <aside>
        <h4>Follow Us</h4>
        <a href="https://instagram.com/">
          <AiFillInstagram />
        </a>
        <a href="https://github.com/sibasish934">
          <AiFillGithub />
        </a>
      </aside>
    </footer>
  );
};

export default Footer;
