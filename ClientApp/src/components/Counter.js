import React, { Component } from 'react';

export class Counter extends Component {
  static displayName = Counter.name;

  constructor (props) {
    super(props);
    this.state = { 
      currentCount: 0,
      firstname : '',
      lastname : '',
      age : '',
      email : '',
      pwd : ''
  };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.incrementCounter = this.incrementCounter.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let data = new FormData();
    data.append('firstname', this.state.firstname);
    data.append('lastname', this.state.lastname);
    data.append('age', this.state.age);
    data.append('email', this.state.email);
    data.append('pwd', this.state.pwd);
    console.log(data);

    fetch('api/SampleData/PostData', {
      body: data,
      method: 'POST'  
    })
    .then(response => response.json())
    .catch(error => console.error(error))
    .then(responseJson => {
      console.log("Success" + responseJson);
    });
    
    
  }

  incrementCounter () {
    this.setState({
      currentCount: this.state.currentCount + 1
    });
  }
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  render () {
    return (
      <div>
        <h1>Counter</h1>


        <p>Current count: <strong>{this.state.currentCount}</strong></p>

        <button className="btn btn-primary" onClick={this.incrementCounter}>Increment</button>
        <h2 style={{margin:"20px"}}>Forms</h2>
        
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="first name" value={this.state.firstname} onChange={this.handleChange('firstname')} />
          <input type="text" placeholder="last name" value={this.state.lastname} onChange={this.handleChange('lastname')} />
          <input type="text" placeholder="age" value={this.state.age} onChange={this.handleChange('age')} />
          <input type="text" placeholder="email" value={this.state.email} onChange={this.handleChange('email')} />
          <input type="text" placeholder="pwd" value={this.state.pwd} onChange={this.handleChange('pwd')} />
          <input className="btn btn-primary" type="submit" value="Submit" />
      </form>

      </div>
    );
  }
}
