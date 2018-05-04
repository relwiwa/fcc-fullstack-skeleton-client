import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ItemList = ({ history, items }) => <div>
  <h2>Item List</h2>
  <ul className="grid-x grid-padding-x grid-margin-x text-center">
    {items.map(item => <div
      className="cell callout medium-3"
      key={item.id}
      onClick={() => history.push(`/item/display/${item.id}`)}
      style={{cursor: 'pointer'}}
    >{item.headline}</div>)}
  </ul>
</div>;

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
};

export default withRouter(ItemList);
