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

  it('should set id on OptionItemFacade based on child id', function () {
    const id = "test";
    const wrapper = shallow(
      <OptionGroup>
        <Checkbox id={id}/>
      </OptionGroup>
    );

    expect(wrapper.find(OptionItemFacade).first().props().id).equal(id);
  });

  it('should set value on optionItem', function () {
    const wrapper = shallow(
      <OptionGroup value ='test:val'>
        <Checkbox id='test' />
      </OptionGroup>
    );

    expect(wrapper.find(OptionItemFacade).first().props().value).equal('val');
  });

  it('should only allow single value within group by default', function () {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <OptionGroup value ='prop1:val' onChange={onChange} >
        <Checkbox id='test' />
      </OptionGroup>
    );

    wrapper.instance().onItemChanged('test', true);
    expect(onChange.args[0][0]).to.equal('test');
  });

  it('should remove item from value if already set', function () {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <OptionGroup value ='test' onChange={onChange} >
        <Checkbox id='test' />
      </OptionGroup>
    );

    wrapper.instance().onItemChanged('test', false);
    expect(onChange.args[0][0]).to.equal('');
  });

   it('should update item value if already set and value specified', function () {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <OptionGroup value ='test' onChange={onChange} >
        <Checkbox id='test' />
      </OptionGroup>
    );

    wrapper.instance().onItemChanged('test', 'val1');
    expect(onChange.args[0][0]).to.equal('test:val1');
  });

  it('should allow multiple values within group if multiValue property set', function () {
    const onChange = sinon.spy();
    const wrapper = shallow(
      <OptionGroup multiValue value ='prop1:val' onChange={onChange} >
        <Checkbox id='test' />
      </OptionGroup>
    );

    wrapper.instance().onItemChanged('test', true);
    expect(onChange.args[0][0]).to.equal('prop1:val/test');
  });

});