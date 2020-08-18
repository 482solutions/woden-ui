import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Row } from 'antd';
import { VotingModalSuccess } from './index';

Enzyme.configure({ adapter: new Adapter() });

test('It renders', () => {
  expect(VotingModalSuccess('hello', 'msg')).to.equal(undefined);
});
