import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

export default class RecordTableRow extends Component {
  constructor(props) {
    super(props);
    this.deleteStudent = this.deleteStudent.bind(this);
  }

  deleteStudent() {
    axios
      .delete(
        "http://localhost:4000/records/delete-record/" + this.props.obj._id
      )
      .then((res) => {
        toast.success("Record successfully deleted!");
        this.props.history.go(0)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.firstname}</td>
        <td>{this.props.obj.lastname}</td>
        <td>{this.props.obj.standard}</td>
        <td>{this.props.obj.subject}</td>
        <td>{this.props.obj.marks}</td>
        <td>
          <Link className="edit-link" to={"/edit-record/" + this.props.obj._id}>
            Edit
          </Link>
          <Button onClick={this.deleteStudent} size="sm" variant="danger">
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}
