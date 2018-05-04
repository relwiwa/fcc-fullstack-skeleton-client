import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../models/item';
import ItemInputsData from '../../config/item-inputs-data';
import ManageItem from './manage-item';

import { formInputStati } from '../../config/words';

const addItemMessages = {};
addItemMessages[formInputStati.enterData] = 'Fill out the fields below to add a new item';
addItemMessages[formInputStati.transferData] = 'Your data is being processed';
addItemMessages[formInputStati.erronousTransfer] = 'Unfortunately an error happened while processing your data';

const AddItem = ({ onAddItem }) => {
  return <ManageItem
    headline={'Add New Item'}
    inputsData={ItemInputsData}
    inputsValues={new Item(null, '', '', null)}
    apiMethod={'post'}
    apiUrl={'http://localhost:3000/item'}
    statusMessages={addItemMessages}
    submitLabel={'Add Item'}
    successCallback={onAddItem}    
  />;
};

AddItem.propTypes = {
  onAddItem: PropTypes.func.isRequired,
};

export default AddItem;
