import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import OptionGroup from 'components/Form/OptionGroup/OptionGroup';
import OptionItemFacade from 'components/Form/OptionGroup/OptionItem/Facade';
import {Checkbox} from 'react-bootstrap';

describe('<OptionGroup/>', function () {

  it('should wrap item Children in a OptionItemFacade', function () {
    const wrapper = shallow(
      <OptionGroup>
        <Checkbox/>
        <Checkbox/>
        <Checkbox/>
      </OptionGroup>
    );

    expect(wrapper.find(OptionItemFacade)).to.have.length(3);
  });

  it('should pass the value to OptionItemFacade', function () {
    const value = 'value';
    const wrapper = shallow(
      <OptionGroup value={value}>
        <Checkbox/>
        <Checkbox/>
        <Checkbox/>
      </OptionGroup>
    );

    expect(wrapper.find(OptionItemFacade).last().props().value).to.equal(value);
  });


  it('should submuit single value within group by default using valueStringHelper', function () {
    const onChange = sinon.spy();
    const getItemValueString = sinon.stub();
    const id = "id";
    const itemValue = "value";
    const newValue = 'new value';

    getItemValueString.returns(newValue);
    const wrapper = shallow(
      <OptionGroup valueStringHelper={{getItemValueString:getItemValueString}}onChange={onChange} >
        <Checkbox/>
      </OptionGroup>
    );

    wrapper.instance().onItemChanged(id, itemValue);
    expect(getItemValueString.calledWith(id, itemValue)).to.be.true;
    expect(onChange.args[0][0]).to.equal(newValue);
  });

   it('should allow multiple values within group if multiValue property set using valueStringHelper', function () {
    const onChange = sinon.spy();
    const getMultiValueString = sinon.stub();
    const id = "id";
    const value = "value";
    const itemValue = "value";
    const newValue = 'new value';
    getMultiValueString.returns(newValue);
    const wrapper = shallow(
      <OptionGroup multiValue valueStringHelper={{getMultiValueString:getMultiValueString}} value={value} onChange={onChange} >
        <Checkbox/>
      </OptionGroup>
    );

    wrapper.instance().onItemChanged(id, itemValue);
    expect(getMultiValueString.calledWith(value, id, itemValue)).to.be.true;
    expect(onChange.args[0][0]).to.equal(newValue);
  });

});