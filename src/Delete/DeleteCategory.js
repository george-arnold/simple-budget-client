import React, { Component } from 'react';
import './Delete.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import BudgetContext from '../BudgetContext';
import TokenService from '../token-service';

class DeleteCategory extends Component {
  static contextType = BudgetContext;

  handleDeleteCategory = event => {
    event.preventDefault();
    const categoryId = this.props.id;
    fetch(`${config.API_ENDPOINT}/categories/${categoryId}`, {
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
        this.context.deleteCategory(categoryId);
      })
      .catch(error => {
        console.error({ error });
      });
  };
  render() {
    return (
      <div>
        <button className="Trash" onClick={this.handleDeleteCategory}>
          <FontAwesomeIcon className="Font-Icon-Trash" icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}

export default DeleteCategory;
