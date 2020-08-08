import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/UserContext";
import API from "../utils/serverApi";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
function Confirm(props) {
  const { value, setValue } = useContext(UserContext);
  const [user, setUser] = useState(value);

  const [total, setTotal] = useState(0);
  useEffect(() => {
    var t = props.curr.length * props.entry;
    setTotal(t);
  }, [props.curr]);
  async function confirm() {
    var res = await axios.post(API.baseURL + "/register/add", {
      data: props.curr,
      mid: props.id,
      fee: props.entry,
      total: total,
      remaining: props.remaining,
      uid: user.id,
    });
    console.log("response---->", res.data.balance);
    setValue({
      id: user.id,
      name: user.name,
      balance: res.data.balance,
      isAdmin: 0,
    });
    props.onHide();
  }

  return (
    <div>
      <Modal {...props} size="m">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm Payment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="booked-details">
            <p>You have booked {props.curr.length} seats</p>
            <p>
              Seats:{" "}
              {props.curr.map((c) => (
                <p style={{ color: "red" }}>{c},</p>
              ))}
            </p>
            <p>
              Total amount you have to pay:{" "}
              <p style={{ color: "red" }}>{total}</p>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={confirm} style={{ background: "#14363d" }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Confirm;
