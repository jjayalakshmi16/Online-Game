import React, { useState, useEffect } from "react";
import API from "../utils/serverApi";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, ButtonToolbar, Modal, Form } from "react-bootstrap";

function AddTournament(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [lastDate, setLastDate] = useState(new Date());
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState(0);
  const [seats, setSeats] = useState(0);
  const [platform, setPlatform] = useState("");
  async function add() {
    var data = {
      Name: name,
      Desc: desc,
      Location: location,
      Fee: fee,
      Seats: seats,
      Platform: platform,
      date: startDate,
      time: startTime,
      last: lastDate,
    };
    var res = await axios.post(API.baseURL + "/match/add", { data });
    // console.log("ADDED SUCCESSFULLY", res.data);
    if (res.data === "success") {
      setName("");
      setDesc("");
      setFee();
      setSeats();
      setLocation("");
      setPlatform("");
      props.onHide();
    }
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={false}
      variant="success"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Tournament
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Tournament Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Match name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Location</Form.Label>
            <Form.Control
              as="select"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option>No Location</option>
              <option>Nehru Stadium</option>
              <option>Cheppakam</option>
              <option>Adayar</option>
              <option>Gandhipuram</option>
              <option>Indra Gandhi</option>
              <option>National Stadium</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Date</Form.Label>
            <br />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Time</Form.Label>
            <br />
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Entry fee</Form.Label>
            <Form.Control
              type="text"
              placeholder="$00.00"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Total seats allocating</Form.Label>
            <Form.Control
              type="text"
              placeholder=""
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Platform</Form.Label>
            <Form.Control
              as="select"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>No Choise</option>
              <option>Online</option>
              <option>Offline</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Last Date for Registration</Form.Label>
            <br />
            <DatePicker
              selected={lastDate}
              onChange={(date) => setLastDate(date)}
            />
          </Form.Group>
          <Form.Group>
            <Form.File
              id="exampleFormControlFile1"
              label="Example file input"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} style={{ background: "#14363d" }}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={add}
          style={{ background: "#14363d" }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddTournament;
