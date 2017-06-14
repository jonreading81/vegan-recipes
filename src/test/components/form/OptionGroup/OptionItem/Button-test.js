import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import {Button} from 'react-bootstrap';
import ButtonOptionItem from 'components/Form/OptionGroup/OptionItem/Button';

const getWrapper = (id, onChange, checked) => {
  return shallow(
      <ButtonOptionItem id={id} onChange={onChange} value={checked}>
        <Button />
      </ButtonOptionItem>
    );
}

describe('<ButtonOptionItem/>', function () {

  it('should set active  if value set to true', function () {
    const wrapper = getWrapper('', null, true);
    const props = wrapper.find(Button).last().props();
    expect(props.active).to.equal(true);
  });

  it('should trigger a click event with the id and value of the child button when clicked', function () {
    const onClick = sinon.spy();
    const id = 'test-id';
    const wrapper = getWrapper(id, onClick, false);

    wrapper.find(Button).last().simulate('click');
    expect(onClick.calledWith(id)).to.be.true;
  });

  it('should trigger a click event passing false if button already active', function () {
    const onClick = sinon.spy();
    const id = 'test-id';
    const wrapper = getWrapper(id, onClick, true);

    wrapper.find(Button).last().simulate('click');
    expect(onClick.calledWith(id, false)).to.be.true;
  });



});