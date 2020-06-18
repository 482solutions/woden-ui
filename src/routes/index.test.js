import React from 'react';
import { expect } from 'chai';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AppRouter from './index';
import PrivateRouter from './PrivateRoute';
import App from '../App';

Enzyme.configure({ adapter: new Adapter() });
it('Renders "Routes"', () => {
  const wrapper = shallow(<AppRouter/>);
  expect(wrapper.find(Router)).to.have.lengthOf(1);
  expect(wrapper.find(App)).to.have.lengthOf(1);
  expect(wrapper.find(Switch)).to.have.lengthOf(1);
  expect(wrapper.find(PrivateRouter)).to.have.lengthOf(1);
  expect(wrapper.find(Route)).to.have.lengthOf(3);
});
