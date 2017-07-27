import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, {expect} from 'chai';
import chaiEnzyme from 'chai-enzyme';
import SortableList from 'components/SortableList/SortableList';
import SortableListItem from 'components/SortableList/SortableListItem';
import { ListGroup } from 'react-bootstrap';
chai.use(chaiEnzyme()) ;

describe('<SortableList/>', function () {

  const defaultData = {
  };

  it('should wrap items in ListGroup', function () {
    const wrapper = shallow(
      <SortableList value='' data={defaultData}/>
    );
    expect(wrapper.find(ListGroup)).to.have.length(1);
  });

  it('have correct class', function () {
    const wrapper = shallow(
      <SortableList value='' data={defaultData}/>
    );
    expect(wrapper.find(ListGroup).prop('className')).to.equal('sortable-list');
  });

  it('allow className to be added', function () {

    const wrapper = shallow(
      <SortableList value='' className="test" data={defaultData}/>
    );
    expect(wrapper.find(ListGroup).prop('className')).to.equal('sortable-list test');
  });

  describe('listItems', () => {

    const data = {
        'test':'Test',
        'test2':'Test 2'
    };

    it('Create ListGroupItem for each item', function () {
      const wrapper = shallow(
        <SortableList value='' data={data} />
      );
      expect(wrapper.find(SortableListItem)).to.have.length(2);
    });

    it('Set childProps on ListGroupItems', function () {
      const wrapper = shallow(
        <SortableList childProps={{className:'test'}} value='' data={data} />
      );
      expect(wrapper.find(SortableListItem).first().prop('childProps')).to.deep.equal({className:'test'});
    });

    it('Display the values provided in the order specified', function () {
      const wrapper = shallow(
        <SortableList value='test2,test' data={data} />
      );
      expect(wrapper.find(SortableListItem).first().prop('children')).to.equal('Test 2');
      expect(wrapper.find(SortableListItem).last().prop('children')).to.equal('Test');
    });
  });

  it('Call onChange event with order key indexes', function () {
    const onChange = sinon.spy();
    const data = {
        'test':'Test',
        'test2':'Test 2'
    };
    const wrapper = shallow(
      <SortableList value='' data={data} onChange={onChange}/>
    );
    wrapper.instance().updateState({items: ['Test','Test 2']});
    expect(onChange.args[0][0]).to.equal('test,test2');
  });
});
