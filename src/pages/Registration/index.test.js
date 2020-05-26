import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Registration } from './index';
import { RegistrationForm } from '../../components/containers/RegistrationForm';
import {Login} from "../Login";

Enzyme.configure({ adapter: new Adapter() });

it('Render components without crashing', () => {
  const wrapper = shallow(<Registration/>);
  expect(wrapper.find('.WodenLogo')).to.have.lengthOf(1);
  expect(wrapper.find('.Welcome')).to.have.lengthOf(1);
  expect(wrapper.find(RegistrationForm)).to.have.lengthOf(1);
});

it('Renders components Registration', () => {
  const history = {
    replace: ()=>{}
  }
  const wrapper = shallow(<Registration
      history={history}
    regRequest={() => {
    }}
  />);
  wrapper.instance().regRequest();
});
