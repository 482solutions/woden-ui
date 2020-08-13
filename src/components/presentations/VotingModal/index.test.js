import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Col, DatePicker, Input, Modal, Row, Steps, TimePicker, } from 'antd';
import { VotingModal } from './index';

const { Search } = Input;
const { Step } = Steps;
const { TextArea } = Input;
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener() {
    },
    removeListener() {
    },
  };
};
Enzyme.configure({ adapter: new Adapter() });
let info = {
  fileData: {
    fileHash: "1b4f6ee7446c1883038caa8b247a1a192a4a47dd20a82b7bd5c4fd886afe51c1",
    fileName: "3acfa22499ef3fa4332fd6a100c704663f561b00771de4f8f4e162b4cf25e169_sk.pem",
    fileType: "application/x-x509-ca-cert",
    ownerId: "richard",
    parentFolderHash: "61bffea9215f65164ad18b45aff1436c0c165d0d5dd2087ef61b4232ba6d2c1a",
    readUsers: ["ddd", "test"],
    writeUsers: ["ddd"],
    voting: ["c6f65850d5cee9860e8e68b957d71cb2a2606f0973d3a21eb0e79f48db30e658"],
    versions: [{
      cid: "QmfS6wpug1bBpHjD4dpuDpGQoppWEBFVaDmFebTKhwK97q",
      time: 1597132176,
      user: "richard"
    }]
  }
}

it('Render 1 page component VotingModal', () => {
  const wrapper = mount(<VotingModal visible={true} info={info} close={() => {
  }} createVoting={() => {
  }}/>);
  wrapper.find(Input).props.value = 'Yes'
  wrapper.find(Button).at(0).props().onClick();
  wrapper.update()
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(Search)).to.have.lengthOf(1);
  expect(wrapper.find(Input)).to.have.lengthOf(1);
  expect(wrapper.find(Row)).to.have.lengthOf(6);
  expect(wrapper.find(Col)).to.have.lengthOf(3);
  expect(wrapper.find(Step)).to.have.lengthOf(4);
  expect(wrapper.find(Button)).to.have.lengthOf(3);
  wrapper.find(Search).props().onChange({ target: { value: 'SomeValue' } })
});

it('Render 2 page component VotingModal', () => {
  const wrapper = mount(<VotingModal visible={true} info={info} close={() => {
  }} createVoting={() => {
  }}/>);
  wrapper.find(Button).at(2).props().onClick();
  wrapper.update()
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(Col)).to.have.lengthOf(2);
  expect(wrapper.find(Row)).to.have.lengthOf(7);
  expect(wrapper.find(DatePicker)).to.have.lengthOf(1);
  expect(wrapper.find(TimePicker)).to.have.lengthOf(1);
  expect(wrapper.find(Step)).to.have.lengthOf(4);
  expect(wrapper.find(Button)).to.have.lengthOf(2);
});

it('Render 3 page component VotingModal', () => {
  const wrapper = mount(<VotingModal visible={true} info={info} close={() => {
  }} createVoting={() => {
  }}/>);
  wrapper.find(Button).at(2).props().onClick();
  wrapper.update()
  wrapper.find(Button).at(1).props().onClick();
  wrapper.update()
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(Row)).to.have.lengthOf(5);
  expect(wrapper.find(TextArea)).to.have.lengthOf(1);
  expect(wrapper.find(Step)).to.have.lengthOf(4);
  expect(wrapper.find(Button)).to.have.lengthOf(2);
  wrapper.find(TextArea).props().onChange({ target: { value: 'SomeValue' } })
});

it('Render 4 page component VotingModal', () => {
  const wrapper = mount(<VotingModal visible={true} info={info} close={() => {
  }} createVoting={() => {
  }}/>);
  wrapper.find(Button).at(2).props().onClick();
  wrapper.update()
  wrapper.find(Button).at(1).props().onClick();
  wrapper.update()
  wrapper.find(Button).at(1).props().onClick();
  wrapper.update()
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(Row)).to.have.lengthOf(4);
  expect(wrapper.find(Col)).to.have.lengthOf(5);
  expect(wrapper.find(Step)).to.have.lengthOf(4);
  expect(wrapper.find(Button)).to.have.lengthOf(2);
  wrapper.find(Col).at(4).props().children.props.onClick()
  wrapper.find(Button).at(1).props().onClick();
  wrapper.update()
});
