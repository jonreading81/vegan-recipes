import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import RadioOptionItem from 'components/Form/OptionGroup/OptionItem/Radio';

const getWrapper = (id, onChange, checked) => {
  const getValueFromValueString = sinon.stub();
  getValueFromValueString.returns(checked);
  return shallow(
      <RadioOptionItem onChange={onChange} valueStringHelper={{getValueFromValueString:getValueFromValueString}}>
        <input type='radio' checked={checked}>{id}</input>
      </RadioOptionItem>
    );
}

describe('<RadioOptionItem/>', function () {

 it('should set radio input  to checked if value set to true', function () {
    const wrapper = getWrapper('id', null, true);
    const props = wrapper.find('input').last().props();
    expect(props.checked).to.equal(true);
  });

  it('should trigger a change event with the id and value of the child input when changed', function () {
    const onChange = sinon.spy();
    const id = 'test-id';
    const wrapper = getWrapper(id, onChange, false);

    wrapper.find('input').last().simulate('change');
    expect(onChange.calledWith(id, true)).to.be.true;
  });

  it('should trigger a change event passing false if input already checked', function () {
    const onChange = sinon.spy();
    const id = 'test-id';
    const wrapper = getWrapper(id, onChange, true);

    wrapper.find('input').last().simulate('change');
    expect(onChange.calledWith(id, false)).to.be.true;
  });

});