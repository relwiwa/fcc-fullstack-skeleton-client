import InputData from '../models/input-data';

const itemInputsData = [
  new InputData(
    'headline',
    'text',
    'Headline',
    'Enter a headline with at least 8 characters',
    (value) => {
      return value.length >= 8 ? true : false;
    },
  ),
  new InputData(
    'content',
    'text',
    'Content',
    'Enter the content of the item with at least 15 characters',
    (value) => {
      return value.length >= 15 ? true : false;
    },
  ),
];

export default itemInputsData;
