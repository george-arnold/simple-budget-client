import React, { Component } from 'react';
import './AddTransaction.css';
import BudgetContext from '../BudgetContext';
import config from '../config';
import Categories from '../SpendingTracker/Categories/Categories';
import TokenService from '../token-service';

class AddTransaction extends Component {
  static contextType = BudgetContext;

  constructor(props) {
    super(props);
    this.state = {
      venue: '',
      amount: '',
      categoryId: '',
      venueError: '',
      amountError: '',
      categoryIdError: ''
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { venue, amount, categoryId } = this.state;
    let valid = true;
    if (!venue.length > 0) {
      this.setState({ venueError: 'Enter Location of Spending' });
      valid = false;
    }
    if (!amount > 0) {
      this.setState({ amountError: 'Enter amount of $$ spent' });
      valid = false;
    }
    if (!categoryId > 0) {
      this.setState({ categoryIdError: 'Please select a category' });
      valid = false;
    }
    if (!valid) {
      alert('Please complete the transaction form');
    } else {
      const transaction = {
        venue: venue,
        amount: amount,
        category_id: categoryId
      };

      fetch(`${config.API_ENDPOINT}/transactions`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `basic ${TokenService.getAuthToken()}`
        },
        body: JSON.stringify(transaction)
      })
        .then(res => {
          if (!res.ok) return res.json().then(event => Promise.reject(event));
          return res.json();
        })
        .then(json => {
          this.context.addTransaction(json);
          this.setState({
            venue: '',
            amount: '',
            categoryId: ''
          });
        })
        .catch(res => console.log('error:', res));
    }
  };

  handleVenueChange = event => {
    const { value } = event.target;
    this.setState({ venue: value });
  };

  handleAmountChange = event => {
    const { value } = event.target;
    this.setState({ amount: Number(value) });
  };
  handleCategoryChange = event => {
    const { value } = event.target;
    this.setState({ categoryId: value });
  };

  render() {
    const { venueError, amountError, categoryIdError } = this.state;
    const { categories } = this.context;
    return (
      <main className="FormContainer Transaction-Container">
        <h2 className="FormTitle">Transaction Entry</h2>
        <img
          className="Landing-Page-Icon App-Icon Transaction-Icon"
          alt="money"
          src="https://cdn0.iconfinder.com/data/icons/business-management-line-2/24/cash-512.png"
        />

        <form className="Form" onSubmit={this.handleSubmit}>
          <label htmlFor="category-selector" className="Category-Select-Label">
            Click below to select a category:
          </label>
          <select
            id="category-selector"
            name="category-selector"
            className="CategorySelector"
            value={this.state.categoryId}
            onChange={this.handleCategoryChange}
          >
            <option>Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {' '}
                {category.name}
              </option>
            ))}
          </select>
          {categoryIdError.length > 0 && <span className="error">{categoryIdError}</span>}
          <label className="Transaction-Label" htmlFor="venue">
            Where did you spend?
          </label>
          <input
            maxLength="50"
            className="Transaction-Input"
            id="venue"
            type="text"
            placeholder="Pepco"
            name="venue"
            value={this.state.venue}
            onChange={this.handleVenueChange}
          ></input>
          {venueError.length > 0 && <span className="error">{venueError}</span>}
          <label className="Transaction-Label" htmlFor="amount">
            How much did you spend?
          </label>

          <input
            id="amount"
            placeholder="100.23"
            className="Transaction-Input"
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleAmountChange}
          ></input>
          {amountError.length > 0 && <span className="error">{amountError}</span>}
          <input className="Submit Submit-Category" type="submit" value="Add Transaction"></input>
        </form>
        <Categories />
      </main>
    );
  }
}

export default AddTransaction;
