import React, { Component } from 'react';
import './Delete.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import BudgetContext from '../BudgetContext';
import TokenService from '../token-service';

class DeleteTransaction extends Component {
  static contextType = BudgetContext;

  handleDeleteTransaction = event => {
    event.preventDefault();
    const transactionId = this.props.id;
    fetch(`${config.API_ENDPOINT}/transactions/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `basic ${TokenService.getAuthToken()}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteTransaction(transactionId);
      })
      .catch(error => {
        console.error({ error });
      });
  };
  render() {
    return (
      <div>
        <button className="Trash Transaction-Trash" onClick={this.handleDeleteTransaction}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}

export default DeleteTransaction;
