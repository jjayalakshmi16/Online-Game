import React, { useState, useEffect } from "react";
import { pure } from "recompose";
import DrawGrid from "./DrawGrid";
import Confirm from "./Confirm";
import API from "../utils/serverApi";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
function Register(props) {
  const [seat, setSeat] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [seatAvailable, setSeatAvailable] = useState([]);
  const [seatReserved, setSeatReserved] = useState([]);
  const [prevReserved, setPrevReserved] = useState([]);
  const [currReserved, setCurrReserved] = useState([]);
  useEffect(() => {
    const t = props.data.seats;
    var foo = [];
    for (var i = 1; i <= t; i = i + 1) {
      foo.push(i);
    }
    if (foo) {
      setSeat(foo);
      setSeatAvailable(foo);
    }

    async function reserved() {
      var gang = [];
      var res = await axios.post(API.baseURL + "/register/fetch", {
        id: props.data.id,
      });

      if (res.data != "no data") {
        res.data.map((d) => gang.push(d.total));
        setSeatReserved(gang);
        setPrevReserved(gang);
        var data1 = [];
        data1 = seatAvailable.filter(function (item) {
          return !seatReserved.includes(item);
        });
        setSeatAvailable(data1);
      }
    }

    if (props.data) {
      reserved();
    }
  }, [props.data]);
  function onClickData(seat) {
    // console.log("searavailable====>", seatAvailable);
    if (seatReserved.indexOf(seat) > -1) {
      setSeatAvailable((prev) => [...prev, seat]);
      var data = seatReserved.filter((res) => res != seat);
      setSeatReserved(data);
    } else {
      setSeatReserved((prev) => [...prev, seat]);
      var data = seatAvailable.filter((res) => res != seat);
      setSeatAvailable(data);
    }
  }
  async function register() {
    var data = [];
    data = await seatReserved.filter(function (item) {
      return !prevReserved.includes(item);
    });
    // setCurrReserved(data);
    // setModal(true);
    // console.log("No. of seats booked by you===>", data.length);
    setCurrReserved(data);
    // console.log(currReserved);
    setModal(true);
  }

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose your Seat!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h1>BookMyMatch</h1>
            <DrawGrid
              seat={seat}
              available={seatAvailable}
              reserved={seatReserved}
              curr={currReserved}
              onClickData={onClickData}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide} style={{ background: "#14363d" }}>
            close
          </Button>
          <Button onClick={register} style={{ background: "#14363d" }}>
            Register
          </Button>
        </Modal.Footer>
      </Modal>
      <Confirm
        show={modal}
        onHide={() => setModal(false)}
        id={props.data.id}
        curr={currReserved}
        entry={props.data.entry}
        remaining={props.data.available}
      />
    </div>
  );
}

export default pure(Register);
