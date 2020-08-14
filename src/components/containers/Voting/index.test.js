import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Button, Table } from 'antd';

const { Column } = Table;
import { Voting } from './index';


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
  data: [{
    votingName: "cert (15).pem",
    fileHash: "90b256193a0f1213c095db22a10d4273ee7d3698fb5e094db41a5b68f5e8ee28",
    votingHash: "84837a4830f6a9875f0dce49ce0cba5264f85afe2e0514595b2e0fa710b83399",
    versionTime: 1597047116,
    dueDate: "1597070160",
    variants: [
      "да",
      "нет",
      "наверно"
    ],
    voters: [
      {
        name: "ddd",
        vote: null
      },
      {
        name: "richard",
        vote: "наверно"
      }
    ],
    description: "опа па",
    status: true,
  }, {
    votingName: "cert (15).pem",
    fileHash: "90b256193a0f1213c095db22a10d4273ee7d3698fb5e094db41a5b68f5e8ee28",
    votingHash: "84837a4830f6a9875f0dce49ce0cba5264f85afe2e0514595b2e0fa710b83399",
    versionTime: 1597047116,
    dueDate: "1597070160",
    variants: [
      "да",
      "нет",
      "наверно"
    ],
    voters: [
      {
        name: "ddd",
        vote: null
      },
      {
        name: "richard",
        vote: "наверно"
      }
    ],
    description: "опа па",
    status: false,
  }
  ]
}


it('Render component Voting Table', () => {
  const wrapper = mount(<Voting voting={info} close={() => {
  }} getVoting={() => {
  }}/>);
  expect(wrapper.find(Table)).to.have.lengthOf(1);
  expect(wrapper.find(Button)).to.have.lengthOf(2);
  wrapper.find(Button).at(0).props().onClick();
  wrapper.find(Button).at(1).props().onClick();
});
