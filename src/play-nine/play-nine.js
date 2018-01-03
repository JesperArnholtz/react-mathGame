import React, { Component } from 'react';
import './play-nine.css';
var _ = require('lodash');

const Stars = (props) => {
    const numberOfStars = 1 + Math.floor(Math.random() * 9);

    let stars = [];

    for (let i = 0; i < numberOfStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>)
    }
    return (
        <div className="col-sm-5">
            {stars}
        </div>
    )
}

const Button = (props) => {
    return (
        <div className="col-sm-2">
            <button>=</button>
        </div>
    )
}

const Answer = (props) => {
    return (
        <div className="col-sm-5">
            {props.selectedNumbers.map((number, i) =>
                <span key={i}>{number}</span>
            )}
        </div>
    )
}

const Numbers = (props) => {
    const numberClassName = (number) => { 
        if(props.selectedNumbers.indexOf(number) >=0){ 
            return 'selected';
        }
    }

    // let numbers = []
    // for (var i = 1; i < Numbers.list; i++) {
    //     numbers.push(<span key={i} className={numberClassName(number)}>{i}</span>);
    // }
    
    return (
        <div className="card text-center">
            {Numbers.list.map((number, i) =>
                <span key={i} className={numberClassName(number)}>{number}</span>
            )}
        </div>
    )
}

Numbers.list = _.range(1,10)
//Numbers.list = 10

class Game extends React.Component {
    state = {
        selectedNumbers: [2, 4]
    }
    render() {
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars />
                    <Button />
                    <Answer selectedNumbers={this.state.selectedNumbers} />
                </div>
                <Numbers selectedNumbers={this.state.selectedNumbers} />
            </div>
        )
    }
}

class PlayNine extends React.Component {
    render() {
        return (
            <div className="App">
                <Game />
            </div>
        )
    }
}

export default PlayNine;