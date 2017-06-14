import React from 'react';

const ButtonOptionItem = ({children, onChange, id, value}) => {
  const newChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      onClick: () => onChange(id, !value),
      active: value
    });
  });
  return (
    <div>{newChildren}</div>
  );
};

export default ButtonOptionItem;
