import React from 'react';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai';
import PrefixValue from 'components/form/prefixValue';
import {FormControl} from 'react-bootstrap';

describe('<PrefixValue />', () => {

  let wrapper;
  let onChange = sinon.spy();

  beforeEach(() => {
    wrapper = shallow(
      <PrefixValue prefixValue="test" value="test:value" delimeter=":" onChange={onChange}/>
    );
  })

  it('has the correct class', () => {
    expect(wrapper.find('div').first().prop('className')).to.equal('prefix-value-field');
  });

  it('has an input field', () => {
    expect(wrapper.find(FormControl).exists()).to.be.true;
  });

  it('removes the prefixValue and delimeter from the value field of the input', () => {
      expect(wrapper.find(FormControl).first().prop('value')).to.equal('value');
  });

  it('fires an onChange event with the prefix value and delimeter when the input is changed', () => {
    wrapper.find(FormControl).simulate('change', {target: {value:'value2'}});
    expect(onChange.args[0][0]).to.equal('test:value2');
  });

});
