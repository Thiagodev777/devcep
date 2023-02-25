import React from "react";
import styles from "./style.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Todos os Direitos Reservados{" "}
        <a target={"_blank"} href="https://github.com/Thiagodev777">
          Antonio Thiago
        </a>
        &copy;
      </p>
    </footer>
  );
};

export default Footer;
