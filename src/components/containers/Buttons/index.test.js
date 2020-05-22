import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Upload, Button } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import { NewFolder } from '..';

import Buttons from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Renders components Buttons', () => {
  const wrapper = shallow(<Buttons/>);
  expect(wrapper.find('.homeButtons')).to.have.lengthOf(1);
  expect(wrapper.find('.upload-button')).to.have.lengthOf(1);
  expect(wrapper.find(Upload)).to.have.lengthOf(1);
  expect(wrapper.find(Button)).to.have.lengthOf(1);
  expect(wrapper.find(FileAddTwoTone)).to.have.lengthOf(1);
  expect(wrapper.find(NewFolder)).to.have.lengthOf(1);
});