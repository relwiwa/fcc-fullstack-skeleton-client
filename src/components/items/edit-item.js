import React from 'react';
import PropTypes from 'prop-types';

import ItemInputsData from '../../config/item-inputs-data';
import ManageItem from './manage-item';

import { formInputStati } from '../../config/words';

const editItemMessages = {};
editItemMessages[formInputStati.enterData] = 'Change the fields below to edit the item';
editItemMessages[formInputStati.transferData] = 'Your data is being processed';
editItemMessages[formInputStati.erronousTransfer] = 'Unfortunately an error happened while processing your data';

const EditItem = ({ item, onEditItem }) => {
  return <ManageItem
    apiMethod={'patch'}
    apiUrl={`http://localhost:3000/item/${item.id}`}
    headline={'Edit Item'}
    inputsData={ItemInputsData}
    inputsValues={item}
    statusMessages={editItemMessages}
    submitLabel={'Save Changes'}
    successCallback={onEditItem}
  />;
};

EditItem.propTypes = {
  item: PropTypes.object.isRequired,
  onEditItem: PropTypes.func.isRequired,
};

export default EditItem;
