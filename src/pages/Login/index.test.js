import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from './index';
import LoginForm from '../../components/containers/LoginForm';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<Login/>);
  expect(wrapper.find('.WodenLogo')).to.have.lengthOf(1);
  expect(wrapper.find('.Welcome')).to.have.lengthOf(1);
  expect(wrapper.find(LoginForm)).to.have.lengthOf(1);
});

it('Calls functions Login', () => {
  const history = {
    replace: ()=>{}
  }
  const wrapper = shallow(<Login
      history={history}
    loginRequest={() => {
    }}
    componentDidMount={() => {
    }}
  />);
  wrapper.instance().replace();
  wrapper.instance().loginRequest();
  wrapper.instance().componentDidMount();
});
