import React, { Component } from 'react';
import './git-card.css';
var axios = require('axios');


class Form extends React.Component {
  state = {userName: ''}
  handleSubmit = (event) => { 
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => { 
        this.props.onSubmit(resp.data);
        this.setState({userName: ''})
      })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
        value={this.state.userName}
        onChange={(event) => this.setState({userName: event.target.value})}
        placeholder="GitHub username" />
        <button type="submit">Find Card</button>
      </form>
    )
  }
}

const GitCard = (props) => (
  <div className="git-card" key={props.id}>
    <img width="75" src={props.avatar_url} />
    <div className="card-info">
      <div className="card-info__name">{props.name}</div>
      <div>{props.company}</div>
    </div>
  </div>
)



const GitCardList = (props) => (
  <div className="git-card-list">
    {props.cards.map(card => <GitCard key={card.id} {...card} />)}
  </div>
)

class GitCardListRender extends React.Component {
  state = {
    cards: [
      {
        id: 1,
        name: "defunkt",
        avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
        company: "Something"
      },
      {
        id: 2,
        name: "mojimbo",
        avatar_url: "https://avatars0.githubusercontent.com/u/1?v=4",
        company: "Something"
      }
    ]
  };

  addNewCard = (cardInfo) =>{ 
    this.setState(prevState => ({ 
      cards: prevState.cards.concat(cardInfo)
    }))
    //console.log(this.state.cards);
  };

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.addNewCard} />
        <GitCardList cards={this.state.cards} />
      </div>
    )
  }
}

export default GitCardListRender;