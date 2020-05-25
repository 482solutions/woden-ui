import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Loading } from './components';
import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

it('Renders without loggedIn and loading', () => {
  const auth = {};
  auth.isLoggedIn = false;
  const wrapper = shallow(<App auth={auth}/>);
  expect(wrapper.find('.app-content')).to.have.lengthOf(1);
  expect(wrapper.find('.app-header')).to.have.lengthOf(0);
  expect(wrapper.find(Loading)).to.have.lengthOf(0);
});
it('Renders without loggedIn but with loading', () => {
  const auth = {};
  auth.isLoggedIn = false;
  const wrapper = shallow(<App auth={auth} loading={true}/>);
  expect(wrapper.find('.app-content')).to.have.lengthOf(1);
  expect(wrapper.find('.app-header')).to.have.lengthOf(0);
  expect(wrapper.find(Loading)).to.have.lengthOf(1);
});
it('Renders with loggedIn, but without loading', () => {
  const auth = {};
  auth.isLoggedIn = true;
  const wrapper = shallow(<App auth={auth} loading={false}/>);
  expect(wrapper.find('.app-content')).to.have.lengthOf(1);
  expect(wrapper.find('.app-header')).to.have.lengthOf(1);
  expect(wrapper.find(Loading)).to.have.lengthOf(0);
});
