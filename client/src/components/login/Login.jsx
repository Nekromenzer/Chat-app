import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import cx from "classnames";
import styles from "./Login.module.css";

const Login = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");

  useEffect(() => {
    if (!name) {
      localStorage.setItem("name", "");
    } else {
      localStorage.setItem("name", name);
    }
  }, [name]);

  const onClick = (e) => {
    if (name) {
      <Redirect to="/chat" />;
    } else {
      e.preventDefault();
      alert("Username Required");
    }
  };

  return (
    <div className={cx(styles["container"])}>
      <div className={cx(styles["wrapper"])}>
        <input
          placeholder="Enter Your Name"
          className={cx(styles["login-input"])}
          type="text"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <Link onClick={onClick} to={`chat?name=${name}&chat-room`}>
          <button
            className={cx(
              styles["login-btn"],
              styles[name.length ? "active" : null]
            )}
            type="submit"
          >
            &#10148;
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
