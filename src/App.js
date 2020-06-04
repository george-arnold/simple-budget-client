import React, { Component } from 'react';
import Navigation from './Navigation/Navigation';
import AddTransaction from './AddTransaction/AddTransaction';
import SpendingTracker from './SpendingTracker/SpendingTracker';
import BudgetContext from './BudgetContext';
import Signin from './Signin/Signin';
import Register from './Signin/Register';
import { Route, Link } from 'react-router-dom';
import './App.css';
import AddCategories from './AddCategory/AddCategories';
import ParticleConfig from './ParticleConfig';
import TokenService from './token-service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'signup',
      signedIn: false,
      categories: [],
      transactions: [],
      demo: false
    };
  }

  componentDidMount() {
    //look at local storage, see if logged in, set signedIn=true,
    // if idle log out
  }

  addTransaction = transaction => {
    this.setState({
      transactions: [...this.state.transactions, transaction]
    });
  };

  addCategory = category => {
    this.setState({
      categories: [...this.state.categories, category]
    });
  };

  deleteTransaction = transactionId => {
    this.setState({
      transactions: this.state.transactions.filter(transaction => transaction.id !== transactionId)
    });
  };

  deleteCategory = categoryId => {
    this.setState({
      categories: this.state.categories.filter(category => category.id !== categoryId)
    });
  };
  //handles signin & logout to execute necessary actions
  onRouteChange = route => {
    if (route === 'signout') {
      this.setState({
        signedIn: false,
        transactions: [],
        categories: []
      });
      TokenService.clearAuthToken();
    } else if (route === 'home') {
      this.setState({ signedIn: true });
    }
    this.setState({
      route: route
    });
  };
  //sets whether or not the app is in demo-mode
  setDemo = value => {
    this.setState({
      demo: value,
      transactions: [
        { id: 1, venue: 'Safeway', amount: 100.53, categoryId: 2 },
        { id: 2, venue: 'Giant', amount: 140.32, categoryId: 2 },
        { id: 3, venue: 'Pepco', amount: 90.22, categoryId: 1 },
        { id: 4, venue: 'Midtown Tavern', amount: 47.34, categoryId: 3 }
      ],
      categories: [
        {
          id: 1,
          name: 'Bills'
        },
        {
          id: 2,
          name: 'Groceries'
        },
        { id: 3, name: 'Fun' }
      ]
    });
  };

  render() {
    const value = {
      demo: this.state.demo,
      categories: this.state.categories,
      transactions: this.state.transactions,
      addTransaction: this.addTransaction,
      addCategory: this.addCategory,
      deleteTransaction: this.deleteTransaction,
      deleteCategory: this.deleteCategory,
      totalCost: this.state.transactions.map(transaction => parseFloat(transaction.amount)).reduce((a, b) => a + b, 0)
    };
    const { signedIn, route } = this.state;
    return (
      <BudgetContext.Provider value={value}>
        <main className="App">
          <Navigation signedIn={signedIn} route={route} onRouteChange={this.onRouteChange} />
          {route === 'home' ? (
            <div className="App-Container">
              <div className="Container">
                <Link className="Link" to="/">
                  Add Expenses
                </Link>
                <Link className="Link" to="/track">
                  Spending Tracker
                </Link>
              </div>
              <div className="Category-Transaction-Container">
                <Route exact path="/" component={AddCategories} />
                <Route exact path="/" component={AddTransaction} />
              </div>
              <Route exact path="/track" component={SpendingTracker} />
            </div>
          ) : route === 'signup' ? (
            <div>
              <ParticleConfig />
              <Signin setDemo={this.setDemo} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          ) : (
            <div>
              <ParticleConfig />
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>
          )}
        </main>
      </BudgetContext.Provider>
    );
  }
}

export default App;
