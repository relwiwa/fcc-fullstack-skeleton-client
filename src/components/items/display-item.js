import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const DisplayItem = ({ authUserOwnsItem, item, onDeleteItem }) => {
  return <Fragment>
    <h2>{item.headline}</h2>
    <p>{item.content}</p>
    {authUserOwnsItem && <div className="button-group">
      <a
        className="button"
        onClick={onDeleteItem}
      >
        <span className="fa fa-trash"></span> Delete Item
      </a>
      <a
        className="button"
        //onClick={() => this.editItem()}
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
};

export default DisplayItem;
