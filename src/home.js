import React, { Component } from 'react';

class Button extends React.Component {

    handleClick = () => {
      this.props.onClickFunction(this.props.incrementValue);
    }
  
    render() {
      return (
        <button onClick={this.handleClick}>
          + {this.props.incrementValue}
        </button>
      );
    }
  }
  
  const Result = (props) => {
    return (
      <span className="block">{props.counter}</span>
    )
  }

class Home extends React.Component {
    state = { counter: 0 };
  
    incrementCounter = (incrementValue) => {
      this.setState((prevState) => ({
        counter: prevState.counter + incrementValue
      }));
    }
    render() {
      return (
  
        <div className="App">
  
          <p className="App-intro">
            <Button incrementValue={1} onClickFunction={this.incrementCounter} />
            <Button incrementValue={2} onClickFunction={this.incrementCounter} />
            <Button incrementValue={5} onClickFunction={this.incrementCounter} />
            <Button incrementValue={10} onClickFunction={this.incrementCounter} />
            <Button incrementValue={100} onClickFunction={this.incrementCounter} />
            <Result counter={this.state.counter} />
          </p>
        </div>
  
      )
    }
  }

export default Home; 