export const isStringOrNull = (props, propName, componentName) => {
  if (props[propName] !== null && typeof props[propName] !== 'string') {
    return new Error(
      'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Validation failed.'
    );
  };
};

export const isTrueFalseOrNull = (props, propName, componentName) => {
  if (props[propName] !== null && props[propName] !== false && props[propName] !== true) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Validation failed.'
    );
  };
};

