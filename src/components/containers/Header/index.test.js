import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Header } from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<Header isLoggedIn={true}/>);
  expect(wrapper.find('#HeaderLogo')).to.have.lengthOf(1);
  expect(wrapper.find('.search-block')).to.have.lengthOf(1);
  expect(wrapper.find('.changePassword')).to.have.lengthOf(1);
  expect(wrapper.find('.logout')).to.have.lengthOf(1);
  expect(wrapper.find('.profile')).to.have.lengthOf(1);
});

it('Renders components Buttons', () => {
  const wrapper = shallow(<Header
    changePasswordRequest={() => {
    }}
    search={() => {
    }}
  />);
  wrapper.instance().changePassword();
  wrapper.instance().onSearch();
});
