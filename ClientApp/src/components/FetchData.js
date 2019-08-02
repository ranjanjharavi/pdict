import React, { Component } from "react";

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { users: [], loading: true };

    fetch("api/SampleData/GetUsers")
      .then(response => response.json())
      .then(data => {
        this.setState({ users: data, loading: false });
      });
  }

  static renderUsersTable(users) {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {users.map(users => (
            <tr key={users.firstname}>
              <td>{users.firstname}</td>
              <td>{users.lastname}</td>
              <td>{users.age}</td>
              <td>{users.email}</td>
              <td>{users.pwd}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      FetchData.renderUsersTable(this.state.users)
    );

    return (
      <div>
        <h1>Users Details</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
