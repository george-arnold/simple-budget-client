import React from 'react';

export default React.createContext({
  demo: '',
  categories: [],
  transactions: [],
  addTransaction: () => {},
  addCategory: () => {},
  deleteTransaction: () => {},
  deleteCategory: () => {},
  addToTotal: () => {},
  // loadUser: () => {},
  totalCost: ''
});
