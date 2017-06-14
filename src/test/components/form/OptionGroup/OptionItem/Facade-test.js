import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import {Checkbox, Button} from 'react-bootstrap';
import FacadeOptionItem from 'components/Form/OptionGroup/OptionItem/Facade';
import CheckBoxOptionItem from 'components/Form/OptionGroup/OptionItem/CheckBox';
import ButtonOptionItem from 'components/Form/OptionGroup/OptionItem/Button';
import RadioOptionItem from 'components/Form/OptionGroup/OptionItem/Radio';

describe('<FacadeOptionItem/>', function () {

  it('should wrap item Checkbox in CheckBoxOptionItem', function () {
 
    const wrapper = shallow(
      <FacadeOptionItem >
        <Checkbox/>
      </FacadeOptionItem>
    );
    expect(wrapper.find(CheckBoxOptionItem)).to.have.length(1);
  });

  it('should wrap item Button in ButtonOptionItem', function () {
 
    const wrapper = shallow(
      <FacadeOptionItem >
        <Button/>
      </FacadeOptionItem>
    );
    expect(wrapper.find(ButtonOptionItem)).to.have.length(1);
  });

 

  it('should pass id and onChange and value to CheckBoxOptionItem', function () {
    const id = 'test-id';
    const value = 'value';
    const onChange = () => {};
    const wrapper = shallow(
      <FacadeOptionItem id={id} onChange={onChange} value={value}>
        <Checkbox/>
      </FacadeOptionItem>
    );
    const props = wrapper.find(CheckBoxOptionItem).last().props();

    expect(props.id).to.equal(id);
    expect(props.value).to.equal(value);
    expect(props.onChange).to.equal(onChange);
  });

  it('should wrap item Input of type radio in RadioOptionItem', function () {
 
    const wrapper = shallow(
      <FacadeOptionItem >
        <input type="radio"/>
      </FacadeOptionItem>
    );
    expect(wrapper.find(RadioOptionItem)).to.have.length(1);
  });

  it('should pass id and onChange and value to RadioOptionItem', function () {
    const id = 'test-id';
    const value = 'value';
    const onChange = () => {};
    const wrapper = shallow(
      <FacadeOptionItem id={id} onChange={onChange} value={value}>
        <input type="radio"/>
      </FacadeOptionItem>
    );
    const props = wrapper.find(RadioOptionItem).last().props();

    expect(props.id).to.equal(id);
    expect(props.value).to.equal(value);
    expect(props.onChange).to.equal(onChange);
  });
});