import React, { useState, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import Header from "./Header";
import Home from "./Home";
import API from "../utils/serverApi";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";
function Admin() {
  const [matches, setMatches] = useState([]);
  const [check, setCheck] = useState(0);
  useEffect(() => {
    async function fetch() {
      var res = await axios.post(API.baseURL + "/match/fetch");
      setMatches(res.data);
    }
    fetch();
  }, [check]);
  function set(val) {
    setCheck(val);
  }
  return (
    <div>
      <Header />
      <Home reload={set} />
      <Card.Group
        itemsPerRow={3}
        style={{
          width: "70%",
          marginLeft: "17%",
          marginTop: "5%",
        }}
      >
        {matches.map((match) => (
          <Card color="yellow">
            <div
              class="ui black ribbon label"
              style={{ width: "106px", marginLeft: "13px" }}
            >
              <i class="hotel icon"></i> {match.platform}
            </div>
            <div class="ui card" style={{ maxWidth: "100%", minWidth: "100%" }}>
              <div class="content" style={{ padding: "0" }}>
                <div class="ui items">
                  <div class="item">
                    <div class="ui medium image" style={{ width: "177px" }}>
                      <img src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=687&q=80" />
                    </div>
                    <div class="content" id="card-match-content">
                      <a class="header">{match.name}</a>
                      <div class="meta">
                        <span class="cinema"> {match.location}</span>
                      </div>
                      <div class="description">
                        <p></p>
                      </div>
                      <div class="extra">
                        <div class="ui label">{match.date}</div>
                        <div class="ui label">
                          <i class="globe icon"></i> Reserve your seat
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="extra content">
                {/* <a>More Info</a> */}
                <Link
                  to={{
                    pathname: "/matchdetails",

                    match: match,
                  }}
                >
                  More Info
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}

export default withRouter(Admin);
