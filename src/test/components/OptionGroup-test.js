import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import OptionGroup from '../../components/Form/OptionGroup';

describe('<OptionGroup/>', function () {
  it('should have a paragraph', function () {
    const wrapper = shallow(<OptionGroup/>);
    expect(wrapper.find('p')).to.have.length(1);
  });

});