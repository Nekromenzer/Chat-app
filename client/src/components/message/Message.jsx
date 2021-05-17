import React from "react";
import cx from "classnames";
import style from "./Message.module.css";
import parentStyle from "../messages/Messages.module.css";

const styles = { ...style, ...parentStyle };

function Message({ message: { user, text }, name }) {
  let isSendByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSendByCurrentUser = true;
  }
  return isSendByCurrentUser ? (
    <div className={cx(styles["sender-container"])}>
      <span className={cx(styles["user-name"], styles["sender-name"])}>
        {trimmedName}
      </span>
      <div className={cx(styles["message"], styles["sender"])}>
        <div className={cx(styles["message-box"], styles["last"])}>
          <p className={cx(styles["text"])}>{text}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className={cx(styles["receiver-container"])}>
      <span className={cx(styles["user-name"], styles["receiver-name"])}>
        {user}
      </span>
      <div className={cx(styles["message"], styles["receiver"])}>
        <div className={cx(styles["message-box"], styles["last"])}>
          <p className={cx(styles["text"])}>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
