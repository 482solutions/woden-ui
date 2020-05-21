import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import FileInMemory from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Render without crashing', () => {
  const wrapper = shallow(<FileInMemory/>);

  expect(wrapper.find('#LoginFileDrop')).to.have.lengthOf(1);
});
