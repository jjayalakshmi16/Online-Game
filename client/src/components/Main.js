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
import Admin from "./Admin";
import User from "./User";

function Main(props) {
  const { value, setValue } = useContext(UserContext);
  const [user, setUser] = useState(value);
  useEffect(() => {
    // console.log("========>", value.name);
    if (value) {
      console.log("main page", value.isAdmin);
    } else {
      props.history.push("/");
    }
  }, []);
  return <div>{value.isAdmin ? <Admin /> : <User />}</div>;
}

export default withRouter(Main);
