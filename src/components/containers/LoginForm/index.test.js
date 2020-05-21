import React from 'react';
import { Link } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Form, Input } from 'antd';
import LoginForm from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Renders "LoginForm" check all components', () => {
  const wrapper = shallow(<LoginForm/>);
  expect(wrapper.find(Button)).to.have.lengthOf(1);
  expect(wrapper.find(Form)).to.have.lengthOf(1);
  expect(wrapper.find(Input)).to.have.lengthOf(1);
  expect(wrapper.find(Input.Password)).to.have.lengthOf(1);
  expect(wrapper.find(Link)).to.have.lengthOf(1);
});
