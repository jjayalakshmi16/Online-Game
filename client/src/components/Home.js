import React, { useState, useEffect } from "react";
import AddTournament from "./AddTournament";
import "../assets/css/home.css";
import { Button, ButtonToolbar, Modal, Form } from "react-bootstrap";

function Home(props) {
  const [modalShow, setModalShow] = React.useState(false);
  useEffect(() => {
    // props.set(Math.random);
    props.reload(Math.random());
  }, [modalShow]);
  return (
    <div className="home">
      <div className="home-text">
        <h1>India's largest Online game Tournament Meet</h1>
        <h3>Book your game venue</h3>
        <Button
          style={{ backgroundColor: "#14363d" }}
          size="lg"
          onClick={() => setModalShow(true)}
        >
          Book
        </Button>
      </div>
      <AddTournament show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}

export default Home;
