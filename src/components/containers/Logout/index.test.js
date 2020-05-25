import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'antd';
import { Logout } from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render Component and check a button', () => {
  const wrapper = shallow(<Logout/>);
  expect(wrapper.find('.button')).to.have.lengthOf(1);
});
it('Check a button', () => {
  const wrapper = shallow(<Logout logout={() => {}}/>);
  expect(wrapper.find(Button).at(0).simulate('click'));
});
