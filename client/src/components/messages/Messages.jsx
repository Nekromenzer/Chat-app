import React from "react";
import cx from "classnames";
import styles from "./Messages.module.css";
import Message from "../message/Message";

function Messages({ messages, name }) {
  return (
    <div>
      {messages.map((message, i) => (
        <div key={i} className={cx(styles["message-parent"])}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  );
}

export default Messages;
