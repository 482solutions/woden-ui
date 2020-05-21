import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Button } from 'antd';
import newFolder from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<newFolder/>);
  expect(wrapper.find(Button)).to.have.lengthOf(1);
});
