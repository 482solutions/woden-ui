import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<Sidebar/>);
  expect(wrapper.find('.sidebar')).to.have.lengthOf(1);
  expect(wrapper.find('.myDrive')).to.have.lengthOf(1);
  expect(wrapper.find('.shared')).to.have.lengthOf(2);
  expect(wrapper.find('.sidebarTitle').text()).to.equal('All Folders');
});

it('Calls functions Login', () => {
  const wrapper = shallow(<Sidebar
    onClick={() => {
    }}
  />);
});
