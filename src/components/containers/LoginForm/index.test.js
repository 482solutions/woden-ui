import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Form, Input } from 'antd';
import LoginForm from './index';

Enzyme.configure({ adapter: new Adapter() });

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener() {
    },
    removeListener() {
    },
  };
};

it('Renders "LoginForm" check all components', () => {
  const wrapper = shallow(<LoginForm/>);
  expect(wrapper.find(Button)).to.have.lengthOf(1);
  expect(wrapper.find(Form)).to.have.lengthOf(1);
  expect(wrapper.find(Input)).to.have.lengthOf(1);
  expect(wrapper.find(Input.Password)).to.have.lengthOf(1);
  expect(wrapper.find(Link)).to.have.lengthOf(1);
});

it('Please enter your name!', () => {
  const wrapper = mount(
    <Router>
      <LoginForm/>
    </Router>,
  );

  expect(wrapper.find('.loginInputItem').at(0).simulate('change',
    { target: { name: 'name', value: '' } }));
});

it('Calls functions Login', () => {
  const wrapper = shallow(<LoginForm
    toggleLoading={() => {
    }}
    onFinish={() => {
    }}
  />);
  wrapper.instance().toggleLoading();
  wrapper.instance().onFinish();
});
