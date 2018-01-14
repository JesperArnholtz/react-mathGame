import React, { Component } from 'react';
import './play-nine.css';
var _ = require('lodash');


var possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount; i++) {
        var combinationSum = 0;
        for (var j = 0; j < listSize; j++) {
            if (i & (1 << j)) { combinationSum += arr[j]; }
        }
        if (n === combinationSum) { return true; }
    }
    return false;
};

const Stars = (props) => {
    //const numberOfStars = 1 + Math.floor(Math.random() * 9);

    let stars = [];

    for (let i = 0; i < props.numberOfStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>)
    }
    return (
        <div className="col-sm-5">
            {stars}
        </div>
    )
}

const Button = (props) => {
    let button;
    switch (props.answerIsCorrect) {
        case true:
            button = <button className="btn btn-success" onClick={props.acceptAnswer}>
                <i className="fa fa-check"></i>

            </button>;
            break;
        case false:
            button = <button className="btn btn-danger">
                <i className="fa fa-times"></i>
            </button>;
            break;
        default:
            button = <button className="btn"
                onClick={props.checkAnswer}
                disabled={props.selectedNumbers.length === 0}>=</button>

            break;
    }
    return (
        <div className="col-sm-2 text-center">
            {button}
            <br />
            <br />
            <button onClick={props.redraw}
                className="btn btn-warning btn-small"
                disabled={props.totalRedraws === 0}>
                <i className="fa fa-refresh"></i> {props.totalRedraws}
            </button>
        </div>
    )
}

const Answer = (props) => {
    return (
        <div className="col-sm-5">
            {props.selectedNumbers.map((number, i) =>
                <span key={i} onClick={() => props.unSelectNumber(number)}>{number}</span>
            )}
        </div>
    )
}

const Numbers = (props) => {
    const numberClassName = (number) => {
        if (props.usedNumbers.indexOf(number) >= 0) {
            return 'used';
        }
        if (props.selectedNumbers.indexOf(number) >= 0) {
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
                <span key={i} className={numberClassName(number)}
                    onClick={() => props.selectNumber(number)}>{number}</span>
            )}
        </div>
    )
}

const DoneFrame = (props) => {
    return (
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
        </div>
    );
}

Numbers.list = _.range(1, 10)
//Numbers.list = 10

class Game extends React.Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9)

    state = {
        selectedNumbers: [],
        randomNumberOfStars: Game.randomNumber(),
        answerIsCorrect: null,
        usedNumbers: [],
        totalRedraws: 5,
        doneStatus: null,
    }
    selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return }
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };
    unSelectNumber = (clickedNumber) => {
        this.setState(prevState => ({
            answerIsCorrect: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
    };
    checkAnswer = () => {
        this.setState(prevState => ({
            answerIsCorrect: prevState.randomNumberOfStars ===
                prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }));
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answerIsCorrect: null,
            randomNumberOfStars: Game.randomNumber()
        }), this.updateDoneStatus);
    };
    redraw = () => {
        if (this.state.totalRedraws === 0) { return }
        this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(),
            selectedNumbers: [],
            answerIsCorrect: null,
            totalRedraws: prevState.totalRedraws - 1
        }), this.updateDoneStatus)
    };
    possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
        const possibleNumbers = _.range(1, 10).filter(number =>
            usedNumbers.indexOf(number) === -1
        );
        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
    }
    updateDoneStatus = () => {
        this.setState(prevState => {
            if (prevState.usedNumbers.length === 9) {
                return { doneStatus: 'Well done' };
            }
            if (prevState.totalRedraws === 0 && !this.possibleSolutions(prevState)) {
                return { doneStatus: 'Game over' }
            }
        });
    }
    render() {
        const { totalRedraws,
            selectedNumbers,
            randomNumberOfStars,
            answerIsCorrect,
            usedNumbers,
            doneStatus } = this.state;
        return (
            <div className="container">
                <h3>Play Nine</h3>
                <hr />
                <div className="row">
                    <Stars numberOfStars={randomNumberOfStars} />
                    <Button selectedNumbers={selectedNumbers}
                        checkAnswer={this.checkAnswer}
                        answerIsCorrect={answerIsCorrect}
                        acceptAnswer={this.acceptAnswer}
                        redraw={this.redraw}
                        totalRedraws={totalRedraws} />
                    <Answer selectedNumbers={selectedNumbers}
                        unSelectNumber={this.unSelectNumber} />
                </div>
                

                {doneStatus ? 
                    <DoneFrame doneStatus={doneStatus} /> : 
                    <Numbers selectedNumbers={selectedNumbers}
                        selectNumber={this.selectNumber}
                        usedNumbers={usedNumbers} />
                }
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