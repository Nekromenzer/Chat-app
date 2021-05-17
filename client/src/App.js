import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Login}></Route>
      <Route path="/chat" component={Chat}></Route>
    </Router>
  );
}

export default App;
