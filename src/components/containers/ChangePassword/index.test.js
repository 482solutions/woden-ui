import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Jest as jest } from '@jest/environment';
import { Button } from 'antd';
import ChangePassword from './index';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('When active link clicked, will push correct filter message', () => {
  let passedFilterType = '';
  const handleOnTotalsFilter = (filterType) => {
    passedFilterType = filterType;
  };
  const accounts = {};
  const wrapper = shallow(<Button onTotalsFilter={handleOnTotalsFilter}/>);
  const button = wrapper.find('#passwordModal');

  button.simulate('click');
  expect(passedFilterType).toBe(TotalsFilterType.archived);
});
