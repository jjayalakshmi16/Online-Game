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
import "../assets/css/signin.css";
import { UserContext } from "../utils/UserContext";

function Signin(props) {
  const { value, setValue } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function login() {
    var Email = email;
    var pass = password;
    if (Email == "" || pass == "") {
      alert("Please fill up the field!");
    } else {
      const response = await axios.post(API.baseURL + "/user/signin", {
        email: email,
        password: password,
      });

      if (response.data == "Password Mismatch!") {
        setEmail("");
        setPassword("");

        alert("Password Mismatch!");
      } else if (response.data == "Please Register!!!") {
        setEmail("");
        setPassword("");

        alert("Please Register!");
      } else {
        console.log("I M HERE.....", response.data.email);
        setValue({
          id: response.data.id,
          name: response.data.name,
          balance: response.data.balance,
          isAdmin: response.data.isadmin,
        });
        props.history.push("/main");
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
          SIGN IN HERE
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
            <a className="submit" onClick={login}>
              Sign in
            </a>
          </div>
          <p className="forgot" align="center">
            <a>Not having an account ?</a>
            <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default withRouter(Signin);
