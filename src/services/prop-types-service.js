export const isTrueFalseOrNull = (props, propName, componentName) => {
  if (props[propName] !== null && props[propName] !== false && props[propName] !== true) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to `' + componentName + '`. Validation failed.'
    );
  };
};
