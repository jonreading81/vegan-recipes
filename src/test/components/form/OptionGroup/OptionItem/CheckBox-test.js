import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import {Checkbox} from 'react-bootstrap';
import CheckBoxOptionItem from 'components/Form/OptionGroup/OptionItem/CheckBox';
import {FormControl} from 'react-bootstrap';


const getMockStringHelper = (value) => {
  const getValueFromValueString = sinon.stub();
  getValueFromValueString.returns(value);
  return {getValueFromValueString:getValueFromValueString};
}

const getWrapper = (id, onChange, value) => {
  return shallow(
      <CheckBoxOptionItem onChange={onChange} value={value} valueStringHelper={getMockStringHelper(value)}>
        <Checkbox>{id}</Checkbox>
      </CheckBoxOptionItem>
    );
}

describe('<CheckBoxOptionItem/>', function () {
  
  it('should determine id and value using checkbox content', function () {
    const onChange = sinon.spy();
    const id = 'test-id';
    const wrapper = getWrapper(id, onChange, false);

    wrapper.find(Checkbox).last().simulate('change');
    expect(onChange.calledWith(id,true)).to.be.true;
  });


  it('should set checkbox to checked if value set to true', function () {
    const wrapper = getWrapper('test', null, true);
    const props = wrapper.find(Checkbox).last().props();
    expect(props.checked).to.equal(true);
  });


  it('should trigger a change event passing false if checkbox already checked', function () {
    const onChange = sinon.spy();
    const id = 'test';
    const wrapper = getWrapper(id, onChange, true);

    wrapper.find(Checkbox).last().simulate('change');
    expect(onChange.calledWith(id, false)).to.be.true;
  });

  describe('Explantion property', function () {
    
    it('should add an FormControl if explain property is specified', function () {
      const wrapper = shallow(
        <CheckBoxOptionItem >
          <Checkbox explain />
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl)).to.have.length(1);
    });


    it('should set hidden className of form control if value false', function () {
      const wrapper = shallow(
        <CheckBoxOptionItem valueStringHelper={getMockStringHelper(false)}>
          <Checkbox explain></Checkbox>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().className).to.equal('hidden');
    });

    it('should set the value of the input', function () {
      const wrapper = shallow(
        <CheckBoxOptionItem valueStringHelper={getMockStringHelper('val')}>
          <Checkbox explain></Checkbox>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().value).to.equal('val');
    });

    it('should set the placeholder of the FormControl using explain property', function () {
      const value = 'value';
      const wrapper = shallow(
        <CheckBoxOptionItem  >
          <Checkbox explain={value}/>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().placeholder).to.equal(value);
    });

    it('should set the placeholder default to "tell me more"', function () {
      const wrapper = shallow(
        <CheckBoxOptionItem  >
          <Checkbox explain/>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().placeholder).to.equal('Tell me more');
    });

    it('should set the value of FormControl to "" if value true', function () {
      const wrapper = shallow(
        <CheckBoxOptionItem  valueStringHelper={getMockStringHelper(true)} >
          <Checkbox explain>test</Checkbox>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().value).to.equal('');
    });

    it('should trigger a change event if the FormControl value is changed', function () {
      const onChange = sinon.spy();
      const id = 'test-id';
      const wrapper = shallow(
        <CheckBoxOptionItem onChange={onChange}>
          <Checkbox explain>{id}</Checkbox>
        </CheckBoxOptionItem>
      );
      wrapper.find(FormControl).last().simulate('change',{target:{value:'text'}});
      expect(onChange.calledWith(id, 'text')).to.be.true;
    });
  });
});