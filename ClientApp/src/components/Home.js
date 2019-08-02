import React, { Component } from "react";
import { Card, CardText } from "material-ui/Card";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import "./custom.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Link } from "react-router-dom";
export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      pwd: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = input => event => {
    this.setState({ [input]: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();

    let data = new FormData();
    data.append("firstname", this.state.firstname);
    data.append("lastname", this.state.lastname);
    data.append("age", this.state.age);
    data.append("email", this.state.email);
    data.append("pwd", this.state.pwd);
    console.log(data);

    fetch("api/SampleData/PostData", {
      body: data,
      method: "POST"
    })
      .then(response => response.json())
      .catch(error => console.log(error))
      .then(responseJson => {
        console.log("Success" + responseJson);
      });

    this.setState({ isLogin: true });
  }

  render() {
    if (!this.state.isLogin) {
      return (
        <React.Fragment>
          <MuiThemeProvider>
            <Card className="mt10">
              <CardText className="input-details">
                <TextField
                  hintText="Enter Your First Name"
                  floatingLabelText="First Name"
                  onChange={this.handleChange("firstname")}
                  defaultValue={this.state.firstname}
                />
                <TextField
                  hintText="Enter Your Last Name"
                  floatingLabelText="Last Name"
                  onChange={this.handleChange("lastname")}
                  defaultValue={this.state.lastname}
                />
                <TextField
                  hintText="Enter Your age"
                  floatingLabelText="Age"
                  onChange={this.handleChange("age")}
                  defaultValue={this.state.age}
                />
                <TextField
                  hintText="Enter Your Email"
                  floatingLabelText="Email"
                  onChange={this.handleChange("email")}
                  defaultValue={this.state.email}
                />
                <TextField
                  hintText="Enter Your Password"
                  floatingLabelText="Password"
                  onChange={this.handleChange("pwd")}
                  defaultValue={this.state.pwd}
                />
                <RaisedButton
                  className=""
                  label="Submit"
                  primary={true}
                  onClick={this.handleSubmit}
                />
              </CardText>
            </Card>
          </MuiThemeProvider>
        </React.Fragment>
      );
    }
    return (
      <MuiThemeProvider>
        <Card>
          <CardText>
            <div>First Name : {this.state.firstname}</div>
            <div>Last Name : {this.state.lastname}</div>
            <div>Age : {this.state.age}</div>
            <div>Email : {this.state.email}</div>
            <div>Pwd: {this.state.pwd}</div>
          </CardText>
          <Link to="/fetch-data">
            <RaisedButton label="Users List" primary={true} />
          </Link>
        </Card>
      </MuiThemeProvider>
    );
  }
}
