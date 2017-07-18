import React from 'react';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai';
import SortableList from 'components/SortableList/SortableList';
import SortableListField from 'components/SortableList/SortableListField';
import { ListGroup } from 'react-bootstrap';

describe('<SortableListField/>', function () {

  it('should wrap a SortableList', function () {
    const wrapper = shallow(
      <SortableListField value={'test'}/>
    );
    expect(wrapper.find(SortableList)).to.have.length(1);
  });

  it('should convert value prop to data field', function () {
    const expectedData = {
      items: ['test', 'test2']
    };
    const value = "test,test2"
    const wrapper = shallow(
      <SortableListField value={value}/>
    );
    expect(wrapper.find(SortableList).last().props().data).to.deep.equal(expectedData);
  });

  it('should call onChange with new value', function () {
    const onChange = sinon.spy();
    const data = {
      items: [
        'test',
        'test2'
      ]
    };
    const wrapper = shallow(
      <SortableListField value={'test'} onChange={onChange}/>
    );
    wrapper.instance().onChange(data);
    expect(onChange.args[0][0]).to.equal('test,test2');
  });
});
