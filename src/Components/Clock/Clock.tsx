import React from "react";
import styles from "./style.module.css";

const Clock = () => {
  const date = new Date();
  const getDate = () => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
  };

  return (
    <div className={styles.clock}>
      <h1>{getDate()}</h1>
      <h1></h1>
    </div>
  );
};

export default Clock;
