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

it('Render without crashing', () => {});
