import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default class CreateRecord extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      firstname: "",
      lastname: "",
      marks: "",
      standard: "",
      subject: "",
    };
  }
  componentDidMount() {
    if (this.props.match.params.id)
      axios
        .get(
          "http://localhost:4000/records/edit-record/" +
            this.props.match.params.id
        )
        .then((res) => {
          const { firstname, lastname, standard, subject, marks } = res.data;

          this.setState({
            firstname,
            lastname,
            standard,
            subject,
            marks,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }
  onHandleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  onSubmit(e) {
    e.preventDefault();
    const { firstname, lastname, standard, subject, marks } = this.state;
    const reqObject = {
      firstname,
      lastname,
      standard,
      subject,
      marks,
    };
    console.log("E", Object.keys(reqObject));
    let hasError = false;
    Object.keys(reqObject).forEach((val, i) => {
      if (!reqObject[val]) {
        toast.error(`${val} can not be empty`);
        hasError = true;
      }
    });
    if (hasError) return;
    if (this.props.match.params.id)
      axios
        .put(
          `http://localhost:4000/records/update-record/${this.props.match.params.id}`,
          reqObject
        )
        .then((res) => {
          toast.success("Record Updated successfully");
          this.props.history.push("/records-list");
        });
    else
      axios
        .post("http://localhost:4000/records/create-record", reqObject)
        .then((res) => {
          toast.success("Record Added successfully");

          this.props.history.push("/records-list");
        });

    this.setState({
      name: "",
      email: "",
      rollno: "",
    });
  }

  render() {
    return (
      <div className="form-wrapper">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstname"
              value={this.state.firstname}
              onChange={this.onHandleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastname"
              value={this.state.lastname}
              onChange={this.onHandleChange}
            />
          </Form.Group>
          <Form.Group controlId="class">
            <Form.Label>Class (number)</Form.Label>
            <Form.Control
              type="number"
              name="standard"
              value={this.state.standard}
              onChange={this.onHandleChange}
            />
          </Form.Group>

          <Form.Group controlId="Name">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              name="subject"
              value={this.state.subject}
              onChange={this.onHandleChange}
            />
          </Form.Group>
          <Form.Group controlId="Name">
            <Form.Label>Marks</Form.Label>
            <Form.Control
              type="number"
              name="marks"
              value={this.state.marks}
              onChange={this.onHandleChange}
            />
          </Form.Group>
          <Button variant="danger" size="lg" block="block" type="submit">
            {this.props.match.params.id ? "Update" : "Create"} Record
          </Button>
        </Form>
      </div>
    );
  }
}
