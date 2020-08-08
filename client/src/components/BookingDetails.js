import React, { useState, useEffect } from "react";
import SeatGrid from "./SeatGrid";
import API from "../utils/serverApi";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
function BookingDetails(props) {
  const [seat, setSeat] = useState([]);
  const [details, setDetails] = useState([]);
  const [seatReserved, setSeatReserved] = useState([]);

  useEffect(() => {
    const t = props.data.seats;
    var foo = [];
    for (var i = 1; i <= t; i = i + 1) {
      foo.push(i);
    }
    if (foo) {
      setSeat(foo);
    }

    async function reserved() {
      var gang = [];
      var sang = [];
      var res = await axios.post(API.baseURL + "/register/fetch", {
        id: props.data.id,
      });

      if (res.data != "no data") {
        res.data.map((d) => {
          gang.push(d.total);
          sang.push(d);
        });
        setDetails(sang);
        setSeatReserved(gang);
      }
    }

    if (props.data) {
      reserved();
    }
  }, [props.data]);

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1>BookMyMatch</h1>
            <SeatGrid seat={seat} reserved={seatReserved} details={details} />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={props.onHide} style={{ background: "#14363d" }}>
            close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingDetails;
