import React, { Component } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import RecordTableRow from "./RecordTableRow";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

export default class RecordsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      filteredRecords: [],
      filtervalue: "",
      filter: "firstname",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/records/")
      .then((res) => {
        this.setState({
          records: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  DataTable() {
    const { records, filterValue, filter } = this.state;
    console.log({ filter, filterValue });
    if (records.length) {
      if (filterValue)
        return records
          .filter((val) => String(val[filter]).includes(filterValue))
          .map((res, i) => {
            return (
              <RecordTableRow obj={res} key={i} history={this.props.history} />
            );
          });
      else
        return records.map((res, i) => {
          return (
            <RecordTableRow obj={res} key={i} history={this.props.history} />
          );
        });
    }
  }
  onHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { filter } = this.state;
    return (
      <div className="table-wrapper">
        <select
          className="custom-select currency"
          name="filter"
          value={filter}
          onChange={(e) => this.setState({ filter: e.target.value })}
        >
          <option value={"standard"}>class</option>
          <option value={"firstname"}>firstname</option>
          <option value={"subject"}>subject</option>
        </select>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group controlId="firstname">
            <Form.Label>Search By {filter}</Form.Label>
            <Form.Control
              type="text"
              name="filterValue"
              value={this.state.filterValue}
              onChange={this.onHandleChange}
            />
          </Form.Group>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>FirstName</th>
              <th>Lastname</th>
              <th>Class</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.DataTable()}</tbody>
        </Table>
      </div>
    );
  }
}
