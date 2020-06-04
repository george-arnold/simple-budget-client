import React, { Component } from 'react';
import './Categories.css';
import BudgetContext from '../../BudgetContext';
import config from '../../config';
import TokenService from '../../token-service';
import DeleteTransaction from '../../Delete/DeleteTransaction';
import DeleteCategory from '../../Delete/DeleteCategory';

class Categories extends Component {
  static contextType = BudgetContext;
  /* eslint-disable */
  componentDidMount() {
    const { categories = [] } = this.context;
    categories.length === 0 &&
      Promise.all([
        fetch(`${config.API_ENDPOINT}/categories`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `basic ${TokenService.getAuthToken()}`
          }
        }),
        fetch(`${config.API_ENDPOINT}/transactions`, {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            authorization: `basic ${TokenService.getAuthToken()}`
          }
        })
      ])
        .then(([categoriesRes, transactionsRes]) => {
          if (!categoriesRes.ok) return categoriesRes.json().then(event => Promise.reject(event));
          if (!transactionsRes.ok) return transactionsRes.json().then(event => Promise.reject(event));
          return Promise.all([categoriesRes.json(), transactionsRes.json()]);
        })
        .then(([categories, transactions]) => {
          //does not pull data from db if in demo mode
          if (!this.context.demo) {
            categories.map(category => this.context.addCategory(category));
            transactions.map(transaction => this.context.addTransaction(transaction));
          }
        });
  }

  render() {
    const { categories = [], transactions = [] } = this.context;
    return (
      <main className="Categories-Display">
        {/* Find the sum of each category */}
        {categories.map(category => {
          category.total = transactions
            .filter(
              transaction =>
                // eslint-disable-next-line
                transaction.categoryId == category.id
            )
            .map(transaction => Number(transaction.amount))
            .reduce((a, b) => a + b, 0);
        })}
        {categories.map(category => (
          <ul key={category.id} className="CategoriesList">
            <li className="CategoriesListItem" key={category.id}>
              {<DeleteCategory id={category.id} />}
              <span className="Category-Name">{category.name}</span>{' '}
              <span className="Category-Total">${category.total}</span>
              <ul className="TransactionList">
                {transactions
                  .filter(
                    transaction =>
                      // eslint-disable-next-line
                      transaction.categoryId == category.id
                  )
                  .map(transaction => (
                    <li className="Transaction-List-Item" key={transaction.id}>
                      <span className="Transaction-Span-1">
                        <DeleteTransaction id={transaction.id} />
                        {transaction.venue}:
                      </span>{' '}
                      <span>${transaction.amount}</span>
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        ))}
      </main>
    );
  }
}

export default Categories;
