import React from 'react';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai';
import SortableList from 'components/SortableList/SortableList';
import SortableListItem from 'components/SortableList/SortableListItem';
import { ListGroup } from 'react-bootstrap';

describe('<SortableList/>', function () {

  it('should wrap items in ListGroup', function () {
    const data = {
      items: [
      ]
    };
    const wrapper = shallow(
      <SortableList data={data}/>
    );
    expect(wrapper.find(ListGroup)).to.have.length(1);
  });

  it('should create ListGroupItem for each item', function () {
    const data = {
      items: [
        'test',
        'test2',
        'test3'
      ]
    };
    const wrapper = shallow(
      <SortableList data={data} />
    );
    expect(wrapper.find(SortableListItem)).to.have.length(3);
  });

  it('should call onChange event', function () {
    const onChange = sinon.spy();
    const data = {
      items: [
        'test',
        'test2',
        'test3'
      ]
    };
    const wrapper = shallow(
      <SortableList data={data} onChange={onChange}/>
    );
    wrapper.instance().updateState(data);
    expect(onChange.args[0][0]).to.deep.equal(data);
  });
});
