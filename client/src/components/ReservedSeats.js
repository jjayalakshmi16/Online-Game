import React, { Component } from "react";
import Table from "react-bootstrap/Table";
export default class ReservedSeats extends Component {
  render() {
    return (
      <div className="right">
        {/* <h4>Reserved Seats: ({this.props.reserved.length})</h4>
        <ul>
          {this.props.reserved.map((res) => (
            <li key={res.id}>
              {res.total} <h5>{res.name}</h5>
            </li>
          ))}
        </ul> */}
        <h4 className="reserved-seats" style={{ marginTop: "70px" }}>
          Reserved seats: ({this.props.reserved.length})
        </h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Username</th>

              <th>Reserved Seat</th>
            </tr>
          </thead>
          <tbody>
            {this.props.reserved.map((res) => (
              <tr>
                <td>{res.name}</td>

                <td>{res.total}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
