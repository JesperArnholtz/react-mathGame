import React, { Component } from 'react';
import logo from './logo.svg';
import Home from './home';
import GitCardListRender from './git-card/git-card';
import PlayNine from './play-nine/play-nine';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <h1 className="App-title">Welcome to React</h1>

    <nav className="main-nav">
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/GitCard'>GitCard</Link></li>
        <li><Link to='/PLayNine'>Play Nine</Link></li>
      </ul>
    </nav>
  </header>
)

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/GitCard' component={GitCardListRender} />
      <Route path='/PlayNine' component={PlayNine} />
    </Switch>
  </main>
)



class App extends React.Component {

  render() {
    return (

      <div>
        <Header />
        <Main /> 
      </div>

    )
  }
}


export default App;
