import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ItemList = ({ history, items }) => <div>
  <h2>Item List</h2>
  <ul>
    {items.map(item => <li key={item.id}><a onClick={() => history.push(`/item/${item.id}/display`)}>{item.headline}</a></li>)}
  </ul>
</div>;

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default withRouter(ItemList);
