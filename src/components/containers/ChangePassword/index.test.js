import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import {
  Button, Form, Input, Modal,
} from 'antd';
import { SettingFilled } from '@ant-design/icons';
import ChangePassword from './index';

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

it('Renders "ChangePassword" check all components', () => {
  const wrapper = shallow(<ChangePassword/>);
  expect(wrapper.find(Button)).to.have.lengthOf(2);
  expect(wrapper.find(Form)).to.have.lengthOf(1);
  expect(wrapper.find(Input.Password)).to.have.lengthOf(3);
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(SettingFilled)).to.have.lengthOf(1);
});

it('Renders "ChangePassword" check change "visible" state after click on special button', () => {
  const wrapper = shallow(<ChangePassword/>);
  expect(wrapper.state().visible).to.equal(false);
  wrapper.find(Button).at(0).simulate('click');
  expect(wrapper.state().visible).to.equal(true);
});

it('Renders components Buttons', () => {
  const wrapper = shallow(<ChangePassword
    showModal={() => {
    }}
    onFinish={() => {
    }}
    handleCancel={() => {
    }}
  />);
  wrapper.instance().showModal();
  wrapper.instance().onFinish();
  wrapper.instance().handleCancel();
});
