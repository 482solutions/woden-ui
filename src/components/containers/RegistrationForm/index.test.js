import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import RegistrationForm from './index';

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


it('Render without crashing', () => {
  const wrapper = shallow(<RegistrationForm/>);
  expect(wrapper.find('.registrationElement')).to.have.lengthOf(1);
  expect(wrapper.find('#Name')).to.have.lengthOf(1);
  expect(wrapper.find('#Email')).to.have.lengthOf(1);
  expect(wrapper.find('#Password')).to.have.lengthOf(1);
  expect(wrapper.find('#Confirm')).to.have.lengthOf(1);
  expect(wrapper.find('.LoginButtonItem')).to.have.lengthOf(1);
});

it('Incorrect username!', () => {
  const wrapper = mount(
    <Router>
      <RegistrationForm/>
    </Router>,
  );

  wrapper.find('.loginInputItem').at(0).simulate('change',
    { target: { name: 'name', value: '   1' } });
});

it('Please enter your username!', () => {
  const wrapper = mount(
    <Router>
      <RegistrationForm/>
    </Router>,
  );

  wrapper.find('.loginInputItem').at(0).simulate('change',
    { target: { name: 'name', value: '' } });
});

it('Invalid email address entered!', () => {
  const wrapper = mount(
    <Router>
      <RegistrationForm/>
    </Router>,
  );

  wrapper.find('.loginInputItem').at(4).simulate('change',
    { target: { name: 'name', value: '   1' } });
});

it('Please enter your email!', () => {
  const wrapper = mount(
    <Router>
      <RegistrationForm/>
    </Router>,
  );

  expect(wrapper.find('.loginInputItem').at(4).simulate('change',
    { target: { name: 'email', value: '' } }));
});

it('Please enter your password!', () => {
  const wrapper = mount(
    <Router>
      <RegistrationForm/>
    </Router>,
  );

  expect(wrapper.find('.password').at(0).simulate('change',
    { target: { name: 'password', value: '' } }));
});
