import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <header>
        <MuiThemeProvider>
          <AppBar title="ReactJS - dotnet Core" />
        </MuiThemeProvider>
      </header>
    );
  }
}
