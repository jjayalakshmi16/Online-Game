import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import API from "../utils/serverApi";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
function MyBookingDetails(props) {
  const { value, setValue } = useContext(UserContext);
  const [user, setUser] = useState(value);
  async function cancel() {
    var balance = user.balance + props.entry;
    var seats = props.available + 1;

    var res = await axios.post(API.baseURL + "/register/cancel", {
      uid: user.id,
      mid: props.mid,
      amt: balance,
      seats: seats,
    });
    setValue({
      id: user.id,
      name: user.name,
      balance: balance,
      isAdmin: 0,
    });
    if (res.data) props.onHide();
  }
  return (
    <div>
      <Modal {...props} size="m">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Booking Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="booked-details">
            <p>You have booked {props.bookings.length} seats</p>
            <p>
              Seats:{" "}
              {props.bookings.map((c) => (
                <p>{c.total},</p>
              ))}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ background: "#14363d" }} onClick={cancel}>
            Cancel Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyBookingDetails;
