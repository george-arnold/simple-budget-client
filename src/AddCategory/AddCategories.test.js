import React from 'react';
import ReactDOM from 'react-dom';
import AddCategories from './AddCategories';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddCategories />, div);
  ReactDOM.unmountComponentAtNode(div);
});
