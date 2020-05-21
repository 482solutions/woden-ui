import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Header from './index';
import { Search } from '../../presentations';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<Header/>);
  expect(wrapper.find(Search)).to.have.lengthOf(1);
});
