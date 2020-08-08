import React, { Component } from "react";
import AvailableList from "./AvailableList";
import ReservedList from "./ReservedList";
import { Card, Image, Button } from "semantic-ui-react";

export default class DrawGrid extends Component {
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
                onClick={(e) => this.onClickSeat(row)}
              >
                {row}{" "}
              </a>
            </Card>
          ))}
        </Card.Group>
        {/* <AvailableList
          available={this.props.available}
          curr={this.props.curr}
        /> */}
        {/* <ReservedList reserved={this.props.reserved} /> */}
      </div>
    );
  }
}
