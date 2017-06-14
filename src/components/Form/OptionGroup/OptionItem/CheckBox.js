import React from 'react';
import {FormControl} from 'react-bootstrap';
import isUndefined from 'lodash/isUndefined';

const CheckBoxOptionItem = ({children, onChange, id, value}) => {
  const newChildren = React.Children.map(children, (child) => {
    const newChild = React.cloneElement(child, {
      onChange: () => onChange(id, !value),
      checked: value
    });
    const explainValue = (isUndefined(value) || value === true ) ? '' : value;
    const placeholder = (child.props.explain === true ) ? 'Tell me more' : child.props.explain;

    return (
      <div>
        {newChild}
        <If condition={child.props.explain}>
           <FormControl
              componentClass="textarea"
              value={explainValue}
              placeholder={placeholder}
              onChange={(evt) => onChange(id, evt.target.value)}
            />
        </If>
      </div>
    );
  });

  return (
    <div>{newChildren}</div>
  );
};

export default CheckBoxOptionItem;
