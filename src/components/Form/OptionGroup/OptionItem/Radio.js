import React from 'react';

const RadioOptionItem = ({children, onChange, id, value}) => {
  const newChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onChange: () => onChange(id, !value),
      checked: value
    });
  });
  return (
    <div>{newChildren}</div>
  );
};

export default RadioOptionItem;
