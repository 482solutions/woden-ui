import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import { Tree } from 'antd';
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<Sidebar/>);
  expect(wrapper.find('.sidebar')).to.have.lengthOf(1);
  expect(wrapper.find(Tree)).to.have.lengthOf(1);
});

it('Calls functions Login', () => {
  const wrapper = shallow(<Sidebar
    onSelect={() => {
    }}
  />);
  wrapper.instance().onSelect();
});
