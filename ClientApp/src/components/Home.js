import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
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
      .catch(error => console.error(error))
      .then(responseJson => {
        console.log("Success" + responseJson);
      });
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppBar title="ReactJS.NET" />
        <React.Fragment>
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
            label="Submit"
            primary={true}
            onClick={this.handleSubmit}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}
