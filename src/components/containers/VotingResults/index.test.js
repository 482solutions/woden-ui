import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Row } from 'antd';
import { VotingResults } from './index';

Enzyme.configure({ adapter: new Adapter() });

const mockData = {
  votingName: 'TestName',
  description: 'description',
  verstionTime: 'Aug 12, 2020, 10:52',
  index: 1,
  variants: [
    'yes', 'no',
  ],
  voters: [
    {
      name: 'Vladimir',
      vote: 'yes',
    },
    {
      name: 'Oleg',
      vote: 'no',
    },
    {
      name: 'John Smith',
      vote: 'yes',
    },
  ],
};

it('Render without crashing', () => {
  const wrapper = shallow(<VotingResults record={mockData} />);
  expect(wrapper.find('.modal-size')).to.have.lengthOf(1);
  expect(wrapper.find('.voting-results')).to.have.lengthOf(1);
  expect(wrapper.find('.voting-results-number')).to.have.lengthOf(1);
});

it('Text', () => {
  const wrapper = shallow(<VotingResults vote={mockData} />);
  expect(wrapper.find('.voting-results').toBe('Voting Results'));
});
