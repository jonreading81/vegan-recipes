import React from 'react';
import { shallow, mount } from 'enzyme';
import {expect} from 'chai';
import SortableList from 'components/SortableList/SortableList';
import SortableListItem from 'components/SortableList/SortableListItem';
import { ListGroup } from 'react-bootstrap';

describe('<SortableList/>', function () {

  const defaultData = {
    items: []
  };

  it('should wrap items in ListGroup', function () {
    const wrapper = shallow(
      <SortableList data={defaultData}/>
    );
    expect(wrapper.find(ListGroup)).to.have.length(1);
  });

  it('have correct class', function () {
    const wrapper = shallow(
      <SortableList data={defaultData}/>
    );
    expect(wrapper.find(ListGroup).prop('className')).to.equal('sortable-list');
  });

  it('allow className to be added', function () {

    const wrapper = shallow(
      <SortableList className="test" data={defaultData}/>
    );
    expect(wrapper.find(ListGroup).prop('className')).to.equal('sortable-list test');
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
