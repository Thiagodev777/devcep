import React from "react";
import styles from "./style.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>
        DEVCEP <i className="bi bi-geo-alt-fill"></i>
      </h1>
    </header>
  );
};

export default Header;
