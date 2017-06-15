import React from 'react';
import CheckBoxOptionItem from 'components/Form/OptionGroup/OptionItem/CheckBox';
import ButtonOptionItem from 'components/Form/OptionGroup/OptionItem/Button';
import RadioOptionItem from 'components/Form/OptionGroup/OptionItem/Radio';
import {Checkbox, Button} from 'react-bootstrap';

const FacadeOptionItem = ({children, onChange, value}) => {
  const newChildren = React.Children.map(children, (child) => {
    switch (child.type) {
      case Checkbox:
        return (
          <CheckBoxOptionItem onChange={onChange} value={value}>{child}</CheckBoxOptionItem>
        );

      case Button:
        return (
          <ButtonOptionItem onChange={onChange}  value={value}>{child}</ButtonOptionItem>
        );

      case 'input':
        return (
          <RadioOptionItem onChange={onChange} value={value}>{child}</RadioOptionItem>
        );

      default:
        return child;
    }
  });

  return (
    <div>{newChildren}</div>
  );
};

export default FacadeOptionItem;
