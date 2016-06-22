import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {ItemsList} from 'components';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { LinkContainer } from 'react-router-bootstrap';

const mockItems=[
	{
		title: 'title 1',
		description: 'description',
		url: 'slug-1'
	},
	{
		title: 'title 2',
		description: 'description',
		url: 'slug-2'
	}
];


describe('<ItemsList />', () => {
  
	it('renders <ListGroupItem /> components for each item', () => {
    const wrapper = shallow(<ItemsList items={mockItems} />);
    expect(wrapper.find(ListGroupItem)).to.have.length(mockItems.length);
  });

  describe('Props', () => {

      let wrapper;

      before(function(){
        wrapper = shallow(<ItemsList items={mockItems} />);

      });

      it('should set header', () => {
        expect(wrapper.find(ListGroupItem).at(0).props().header)
        .to.equal(mockItems[0].title);
      });

       it('should set destination on link container', () => {
        expect(wrapper.find(LinkContainer).at(0).props().to)
        .to.equal(mockItems[0].url);
      });
  });

});