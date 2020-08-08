import React, { useState, useEffect, useContext } from "react";
import GoogleLogin from "react-google-login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  withRouter,
} from "react-router-dom";
import API from "../utils/serverApi";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import "../assets/css/signin.css";

function Signup(props) {
  const { value, setValue } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  async function signup(e) {
    e.preventDefault();
    var Email = email;
    var pass = password;
    var Name = name;
    if (Email == "" || pass == "" || Name == "") {
      alert("Please fill up the field!");
    } else {
      const response = await axios.post(API.baseURL + "/user/signup", {
        name: name,
        email: email,
        password: password,
      });
      console.log("THIS IS THE RESPONSE=====>", response.data);
      if (response.data == "success") {
        alert("Registered Successfully...PLease do LOGIN!");
        props.history.push("/");
      } else {
        setName("");
        setEmail("");
        setPassword("");
        alert("User Already exists!");
      }
    }
  }
  function responseGoogle(response) {
    console.log(response);
    console.log(response.profileObj);
    const res = axios.post(API.baseURL + "/user/googlesignin", {
      email: response.profileObj.email,
    });
    console.log("======google login response=======>", res);
    props.history.push("/main");
  }
  return (
    <div className="bck-main">
      <div className="text-main">
        <b>India's Biggest </b>
        <br />
        <b>Tournament Booking Platform</b>
        <br />
        <div className="text-inner">
          <p>You could easily manage your bookings via BookmyMatch.com</p>

          <p>
            Get timely response about your bookings, <br />
            <br />
            Get start you journey with us TODAY!!!
          </p>
        </div>
      </div>
      <div className="main">
        <p className="sign" align="center">
          SIGNUP HERE
        </p>
        <GoogleLogin
          clientId="743829497609-mlni2use4fv3l4os769o2hunnefh78ik.apps.googleusercontent.com"
          buttonText="Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <form className="form1">
          <input
            className="un "
            type="text"
            align="center"
            placeholder="Username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="un "
            type="text"
            align="center"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pass"
            type="password"
            align="center"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="login-btn">
            <a className="submit" onClick={signup}>
              Sign up
            </a>
          </div>
          <p className="forgot" align="center">
            <a>
              Already have an account ?<Link to="/">Login</Link>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signup);
