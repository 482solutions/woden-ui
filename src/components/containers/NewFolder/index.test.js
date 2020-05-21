import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import {
  Button, Form, Input, Modal,
} from 'antd';
import { FolderAddTwoTone } from '@ant-design/icons';
import NewFolder from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Renders "NewFolder" check all components', () => {
  const wrapper = shallow(<NewFolder/>);
  expect(wrapper.find(FolderAddTwoTone)).to.have.lengthOf(1);
  expect(wrapper.find(Button)).to.have.lengthOf(3);
  expect(wrapper.find(Modal)).to.have.lengthOf(1);
  expect(wrapper.find(Form)).to.have.lengthOf(1);
  expect(wrapper.find(Input)).to.have.lengthOf(1);
});
