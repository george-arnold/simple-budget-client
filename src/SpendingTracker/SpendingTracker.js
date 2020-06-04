import React, { Component } from 'react';
import './SpendingTracker.css';
import BudgetContext from '../BudgetContext';
import SpendingGraph from './SpendingGraph';

class SpendingTracker extends Component {
  static contextType = BudgetContext;
  /* eslint-disable */
  render() {
    const { categories, transactions } = this.context;
    return (
      <main className="SpendingTracker">
        <h2>Your Spending</h2>
        <p>Total Amount Spent</p>
        <h3>${Math.floor(this.context.totalCost * 100) / 100}</h3>
        <div className="Spending-Graph-Container">
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

          <SpendingGraph categories={this.context.categories} />
        </div>
      </main>
    );
  }
}

export default SpendingTracker;
