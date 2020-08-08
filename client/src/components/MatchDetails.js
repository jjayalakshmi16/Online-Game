import React, { useState, useEffect } from "react";
import Header from "./Header";
import Register from "./Register";
import API from "../utils/serverApi";
import axios from "axios";
import { Card, Button, Grid } from "semantic-ui-react";
import "../assets/css/details.css";
import MyBookingDetails from "./MyBookingDetails";
import BookingDetails from "./BookingDetails";
function MatchDetails(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [modal1, setModal1] = React.useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    if (props.location.match) {
      setData(props.location.match);
      async function match() {
        console.log("id of details--->", props.location.match.id);
        var res = await axios.post(API.baseURL + "/match/get", {
          id: props.location.match.id,
        });
        if (res.data) {
          setData(res.data[0]);
        }
      }
      if (props.location.match.id) match();
    } else props.history.push("/");
  }, [props, modalShow]);

  return (
    <div>
      <Header />
      <div class="hero-image">
        <div class="hero-text">
          <h1 style={{ fontSize: "50px", textAlign: "left" }}>{data.name}</h1>
          <h4>Location: {data.location}</h4>
          <h4>Date: {data.date}</h4>
          <h4>Time: {data.time}</h4>
        </div>
        <div class="hero-register">
          <Card style={{ background: "rgba(48, 48, 36, 0.44)" }}>
            <Card.Content>
              <h4>Registration Details</h4>

              <h5>
                {data.available}/{data.seats} Seats
              </h5>
              <Button
                onClick={() => setModal1(true)}
                style={{ background: "white", color: "black" }}
              >
                view
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
      <div className="Right-side">
        <div className="description">
          <h2>Description</h2>
          <div className="description-text">
            <p>
              {data.description}
              <br />
              BookMyMatch is one of India's largest gaming platforms having
              conducted over 14 events since 2016 reaching over 30,000 Gamers
              offline and 10 Million + online. Today BookMyMatch is more than
              just events with a massive online community with unique engaging
              content, esports and a brand new sales platform just for gamers.
            </p>
          </div>
        </div>
        <div className="description-right">
          <h2 className="heading2">Time Zone</h2>
          <div className="description-text">
            <p>{data.time}</p>
          </div>
          <h2 className="heading2">Contact</h2>
          <div className="description-text">
            <p>admin@gmail.com</p>
          </div>
          <h2 className="heading2">Rules</h2>
          <div className="description-text">
            <p>1. Read the game rules if you are going to participate</p>
            <br />
            <p>
              2. Bring the Soft copy of the reservation details that was sent to
              your respective email
            </p>
            <br />
            <p>3. Presence before the commence of game is mandatory</p>
          </div>
        </div>
      </div>
      <BookingDetails
        show={modal1}
        onHide={() => setModal1(false)}
        id={props.location.match.id}
        data={data}
      />
    </div>
  );
}

export default MatchDetails;
