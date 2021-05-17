import React from "react";
import cx from "classnames";
import styles from "./Input.module.css";

function Input({ message, setMessage, sendMsg }) {
  return (
    <form className={cx(styles["msg-btn-wrapper"])}>
      <input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? sendMsg (event) : null
        }
        className={cx(styles["msg-input"])}
        placeholder="Type here........."
      />

      <button
        onClick={sendMsg}
        className={cx(
          styles["send-btn"],
          styles[message.length ? "active" : null]
        )}
      >
        &#10148;
      </button>
    </form>
  );
}
export default Input;
