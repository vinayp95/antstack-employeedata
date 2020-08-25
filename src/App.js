import React, { Component } from 'react';
import './App.css';
import Form from './Form'

class App extends Component {

  state = {
    fields:{}
  };

  onSubmit = (fields) => {
    this.setState({fields});
    console.log(fields);
  }

  render(){
  return (
    <div>
    <Form onSubmit={fields => this.onSubmit(fields)}/>
   </div>
  );
}
}

export default App;
