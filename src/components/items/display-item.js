import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const DisplayItem = ({ authUserOwnsItem, item, onDeleteItem, onEditItem }) => {
  return <Fragment>
    <h2>{item.headline}</h2>
    <p>{item.content}</p>
    {authUserOwnsItem && <div className="button-group">
      <a
        className="button hollow secondary"
        onClick={onDeleteItem}
      >
        <span className="fa fa-trash"></span> Delete Item
      </a>
      <a
        className="button hollow secondary"
        onClick={onEditItem}
      >
        <span className="fa fa-edit"></span> Edit Item
      </a>
    </div>}
  </Fragment>;
};

DisplayItem.propTypes = {
  authUserOwnsItem: PropTypes.bool.isRequired,  
  item: PropTypes.object.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
};

export default DisplayItem;
