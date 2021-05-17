import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";
import cx from "classnames";
import styles from "./Chat.module.css";
import ChatHeader from "../header/ChatHeader";
import Input from "../input/Input";
import Messages from "../messages/Messages";
import ErrorMessage from "../error-message/ErrorMessage";

let socket;

const Chat = ({ location }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageState, setMessageState] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory();
  // backend endpoint
  const ENDPOINT = "localhost:5000";
  // set name from local storage
  const name = localStorage.getItem("name");

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    // socket connection
    socket = io.connect(ENDPOINT, {
      withCredentials: true,
      extraHeaders: {
        name: "",
      },
    });

    // check any user name duplicates
    socket.emit("login", { name }, (error, states) => {
      if (error) {
        localStorage.clear();
        alert(error);
        history.push("/");
      }
    });
  }, [ENDPOINT, history, location.search]);

  // set msg to msg array
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
    return () => {
      // set some delay
      setTimeout(() => {
        setMessageState(null);
      }, 750);
    };
  }, [messages]);

  useEffect(() => {
    connectionErrors();
  });

  // errors when disconnect or reconnecting
  const connectionErrors = () => {
    if (!name || (socket.disconnected && socket.connection)) {
      setErrorMsg("Something went wrong ,Please try again later!");
    } else if (socket.io._readyState !== "open") {
      setErrorMsg("Reconnecting ,Please try again later!");
    } else {
      setErrorMsg("");
    }
  };

  // send msg
  const sendMsg = (event) => {
    event.preventDefault();
    setTimeout(() => {
      if (message) {
        socket.emit("sendMessage", message, (response, error) => {
          setMessage("");
          // set success response
          setMessageState(response.status);
        });
      }
    }, 500);
  };

  // disconnect
  const signOutUser = () => {
    socket.disconnect();
  };

  return (
    <div className={cx(styles["container"])}>
      <div className={cx(styles["wrapper"])}>
        <ChatHeader signOutUser={signOutUser} messageState={messageState} />
        <div className={cx(styles["inner-wrapper"])}>
          <ScrollToBottom className={cx(styles["messages"])}>
            <ErrorMessage errorMsg={errorMsg} />
            <Messages messages={messages} name={name} />
          </ScrollToBottom>
          <div className={cx(styles["btn-container"])}>
            <Input
              message={message}
              setMessage={setMessage}
              sendMsg={sendMsg}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
