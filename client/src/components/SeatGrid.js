import React, { Component } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import ReservedSeats from "./ReservedSeats";

export default class SeatGrid extends Component {
  onClickSeat(seat) {
    this.props.onClickData(seat);
  }
  render() {
    return (
      <div className="container">
        <Card.Group
          itemsPerRow={3}
          style={{
            width: "70%",
            marginLeft: "17%",
            marginTop: "5%",
          }}
        >
          {this.props.seat.map((row) => (
            <Card>
              <a
                className={
                  this.props.reserved.indexOf(row) > -1
                    ? "reserved"
                    : "available"
                }
                key={row}
              >
                {row}{" "}
              </a>
            </Card>
          ))}
        </Card.Group>

        <ReservedSeats reserved={this.props.details} />
      </div>
    );
  }
}
