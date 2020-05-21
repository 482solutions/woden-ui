import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import RegistrationForm from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<RegistrationForm/>);
  expect(wrapper.find('.registrationElement')).to.have.lengthOf(1);
  expect(wrapper.find('#Name')).to.have.lengthOf(1);
  expect(wrapper.find('#Email')).to.have.lengthOf(1);
  expect(wrapper.find('#Password')).to.have.lengthOf(1);
  expect(wrapper.find('#Confirm')).to.have.lengthOf(1);
  expect(wrapper.find('.LoginButtonItem')).to.have.lengthOf(1);
});
