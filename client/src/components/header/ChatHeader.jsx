import { React } from "react";
import cx from "classnames";
import styles from "./ChatHeader.module.css";

const ChatHeader = ({ signOutUser, messageState }) => {
  return (
    <div className={cx(styles["container"])}>
      <div className={cx(styles["msg-send-state"])}>
        {messageState ===202 ? <span>Message Sent !</span> : ""}
      </div>
      <div>
        {/* just redirect user to login without clearing username in local-storage */}
        <a href="/" onClick={signOutUser}>
          <button className={cx(styles["exit-btn"])}>Exit</button>
        </a>
      </div>
    </div>
  );
};

export default ChatHeader;
