import React from "react";
import styles from "./ErrorMessage.module.css";

function ErrorMessage({ errorMsg }) {
  return <span className={styles.error}>{errorMsg}</span>;
}

export default ErrorMessage;
