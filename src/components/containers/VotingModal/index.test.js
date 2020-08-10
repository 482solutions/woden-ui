import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Row } from 'antd';
import { VotingModal } from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<VotingModal />);
  expect(wrapper.find('.voting-success-image')).to.have.wlengthOf(1);
  expect(wrapper.find('.modal-size')).to.have.lengthOf(0);
  expect(wrapper.find('.voting-success-title')).to.have.lengthOf(1);
  expect(wrapper.find('.voting-success-message')).to.have.lengthOf(1);
  expect(wrapper.find(<Row />)).to.have.lengthOf(1);
});
