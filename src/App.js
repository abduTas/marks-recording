import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import CreateRecord from "./components/create-record";
import { Flip, ToastContainer } from "react-toastify";
import RecordsList from "./components/records-list";
import { createBrowserHistory } from "history";

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <ToastContainer
        position="top-right"
        newestOnTop={false}
        closeOnClick
        rtl={false}
        autoClose={5000}
        pauseOnFocusLoss={false}
        draggable
        transition={Flip}
        hideProgressBar
      />
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                <Link to={"/create-record"} className="nav-link">
                  Records Crud App
                </Link>
              </Navbar.Brand>

              <Nav className="justify-content-end">
                <Nav>
                  <Link to={"/create-record"} className="nav-link">
                    Create Record
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/records-list"} className="nav-link">
                    Records List
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/" component={CreateRecord} />
                  <Route path="/create-record" component={CreateRecord} />
                  <Route path="/edit-record/:id" component={CreateRecord} />
                  <Route path="/records-list" component={RecordsList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
}

export default App;
