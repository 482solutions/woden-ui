import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { VotingModal } from './index';

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
  variants: ['yes', 'no'], votingName: 'test name', versionTime: '12 Aug 2020', votingHash: '132123132', description: 'hello',
};

it('Render without crashing', () => {
  const wrapper = shallow(<VotingModal record={mockData}/>);
  expect(wrapper.find('.voting-title')).to.have.lengthOf(1);
  expect(wrapper.find('.modal-size')).to.have.lengthOf(1);
  expect(wrapper.find('.voting-file-container')).to.have.lengthOf(1);
  expect(wrapper.find('.voting-file-name')).to.have.lengthOf(1);
});

it('Text is correct', () => {
  const wrapper = shallow(<VotingModal record={mockData}/>);
  expect(wrapper.find('.voting-title').text()).to.equal('Voting');
  expect(wrapper.find('.voting-file-name').text()).to.equal(mockData.votingName);
  expect(wrapper.find('.voting-file-date').at(0).text()).to.equal(mockData.versionTime);
  expect(wrapper.find('.voting-file-date').at(1).text()).to.equal(mockData.description);
});

it('Button clicks work correctly', () => {
  const wrapper = shallow(<VotingModal record={mockData}/>);
  expect(wrapper.find('.voting-submit-button').text()).to.equal('Submit Your Vote '.toUpperCase());
  wrapper.find('.voting-button').at(0).simulate('click');
  expect(wrapper.find('.voting-submit-button').text()).to.equal((`Vote For: ${mockData.variants[0]} `).toUpperCase());
});
