import React from 'react';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai';
import PrefixValue from 'components/Form/PrefixValue';
import {FormControl} from 'react-bootstrap';

describe('<PrefixValue />', () => {

  let wrapper;
  let onChange = sinon.spy();

  beforeEach(() => {
    wrapper = shallow(
      <PrefixValue id="test" prefixValue="test" value="test:value" delimeter=":" onChange={onChange}/>
    );
  })

  it('has the correct class', () => {
    expect(wrapper.find('div').first().prop('className')).to.equal('prefix-value-field');
  });

  describe('Input', () => {

    let input;

    beforeEach(() => {
      input = wrapper.find(FormControl);
    });

    it('has an input field', () => {
      expect(input.exists()).to.be.true;
    });

    it('set id', () => {
      expect(input.first().prop('id')).to.equal('test');
    });

    it('removes the prefixValue and delimeter from the value field of the input', () => {
        expect(input.first().prop('value')).to.equal('value');
    });

    it('fires an onChange event with the prefix value and delimeter when the input is changed', () => {
      input.simulate('change', {target: {value:'value2'}});
      expect(onChange.args[0][0]).to.equal('test:value2');
    });

    it('fires an onChange event with the prefix value and delimeter when the input is blurred', () => {
      input.simulate('blur', {target: {value:'value2'}});
      expect(onChange.args[0][0]).to.equal('test:value2');
    });
  });



});
