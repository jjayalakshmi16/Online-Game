import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  withRouter,
} from "react-router-dom";
import "../assets/css/header.css";
function Header(props) {
  const { value, setValue } = useContext(UserContext);
  const [user, setUser] = useState(value);
  useEffect(() => {
    console.log("========>", value.name);
    if (value) {
      console.log("header page", user.name);
    } else {
      props.history.push("/");
    }
  }, []);
  return (
    <div className="top">
      <img
        className="logo"
        src="https://image.freepik.com/free-vector/modern-sports-logo-template-with-flat-design_23-2147954941.jpg"
      />
      <p className="logo-name">
        <b>BookMyMatch</b>
      </p>

      <p className="username">
        <p>{user.name}</p>
      </p>
      <img
        className="avatar"
        src="https://www.w3schools.com/w3images/avatar2.png"
      />
      {user.isadmin > 0 ? null : (
        <div className="acc">
          <p>balance: ${user.balance}</p>
        </div>
      )}

      <a className="logout">
        <Link to="/" className="logout">
          Logout
        </Link>
      </a>
    </div>
  );
}

export default withRouter(Header);
