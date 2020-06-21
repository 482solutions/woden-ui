import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import {
  Form, Input, Modal, Select,
} from 'antd';
import { PermissionsModal } from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render all component PermissionsModal', () => {
  const wrapper = shallow(<PermissionsModal visible={true} info={{ title: 'Test Title' }} close={() => {}} changePermissions={() => {}}/>);
  expect(wrapper.find(Form)).to.have.lengthOf(1);
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(Input)).to.have.lengthOf(1);
  expect(wrapper.find(Select)).to.have.lengthOf(1);
  expect(wrapper.find(Modal).props().onOk()).to.be.equal(undefined);
});
