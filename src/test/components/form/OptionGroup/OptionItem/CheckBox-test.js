import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import {Checkbox} from 'react-bootstrap';
import CheckBoxOptionItem from 'components/Form/OptionGroup/OptionItem/CheckBox';
import {FormControl} from 'react-bootstrap';

const getWrapper = (id, onChange, checked) => {
  return shallow(
      <CheckBoxOptionItem id={id} onChange={onChange} value={checked}>
        <Checkbox />
      </CheckBoxOptionItem>
    );
}

describe('<CheckBoxOptionItem/>', function () {

  it('should set checkbox to checked if value set to true', function () {
    const wrapper = getWrapper('', null, true);
    const props = wrapper.find(Checkbox).last().props();
    expect(props.checked).to.equal(true);
  });

  it('should trigger a change event with the id and value of the child checkbox when changed', function () {
    const onChange = sinon.spy();
    const id = 'test-id';
    const wrapper = getWrapper(id, onChange, false);

    wrapper.find(Checkbox).last().simulate('change');
    expect(onChange.calledWith(id, true)).to.be.true;
  });

  it('should trigger a change event passing false if checkbox already checked', function () {
    const onChange = sinon.spy();
    const id = 'test-id';
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

    it('should set the value of the input', function () {
      const value = 'value';
      const wrapper = shallow(
        <CheckBoxOptionItem value={value}>
          <Checkbox explain/>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().value).to.equal(value);
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

    it('should set the value of FormControl to "" if value undefiend', function () {
      const wrapper = shallow(
        <CheckBoxOptionItem  >
          <Checkbox explain/>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().value).to.equal('');
    });

    it('should set the value of FormControl to "" if value true', function () {
      const wrapper = shallow(
        <CheckBoxOptionItem  value={true} >
          <Checkbox explain/>
        </CheckBoxOptionItem>
      );
      expect(wrapper.find(FormControl).props().value).to.equal('');
    });

    it('should trigger a change event if the FormControl value is changed', function () {
      const onChange = sinon.spy();
      const id = 'test-id';
      const wrapper = shallow(
        <CheckBoxOptionItem id={id} onChange={onChange}>
          <Checkbox explain/>
        </CheckBoxOptionItem>
      );
      wrapper.find(FormControl).last().simulate('change',{target:{value:'text'}});
      expect(onChange.calledWith(id, 'text')).to.be.true;
    });
  });
});