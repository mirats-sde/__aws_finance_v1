import React from "react";
import styles from "./Loader.module.css";
import spinner from "../../assets/spinner.gif";
const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <img src={spinner} alt="" />
    </div>
  );
};

export default Loader;
