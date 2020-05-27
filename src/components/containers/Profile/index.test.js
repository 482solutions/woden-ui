import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import Profile from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<Profile/>);
  expect(wrapper.find('.profileImage')).to.have.lengthOf(1);
  expect(wrapper.find('.userName')).to.have.lengthOf(1);
});

it('Calls functions Search', () => {
  const wrapper = shallow(<Profile
    componentDidMount={() => {
    }}
  />);
  wrapper.instance().componentDidMount();
});
