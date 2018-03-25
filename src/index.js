import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter, Link } from 'react-router-dom';
import App from './App';
import Header from './Header.js';
import Table from './Table.js';
import './index.css';


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/Table' component={Table} />
    </Switch>
  </main>
)

const Index = () => (
  <div>
    <Header />
    <Main />
  </div>
)

ReactDOM.render(
  (
    <HashRouter>
      <Index />
    </HashRouter>
  ),
  document.getElementById("root")
);

/* ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker(); */
