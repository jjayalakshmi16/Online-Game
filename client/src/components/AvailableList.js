import React, { Component } from "react";

export default class AvailableList extends Component {
  render() {
    const seatCount = this.props.available.length;
    return (
      <div className="left">
        <h4>
          Available Seats: ({seatCount == 0 ? "No seats available" : seatCount})
        </h4>
        <ul>
          {this.props.curr.map((res) => (
            <li key={res}>{res}</li>
          ))}
        </ul>
      </div>
    );
  }
}
