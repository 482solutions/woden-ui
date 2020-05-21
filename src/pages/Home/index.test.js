import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Buttons, Sidebar } from '../../components/containers';
import { Home } from './index';

Enzyme.configure({ adapter: new Adapter() });

it('Renders "Home" check all components', () => {
  const fakeFolders = [
    {
      name: '1',
      hash: '567f7d6dc9d1d2ee6f4a3dd53118eda2317e17b437953c2aba665816b69ec753',
    },
    {
      name: '2',
      hash: '85dc732bf4469baf38d2f1df67adbe7fef09403b5aa4ed6260886fc8360d276c',
    },
    {
      name: '3',
      hash: '70c7a1db1045dcdabfadda004b7fc343639da127c02c1968e131021a93a035d1',
    },
  ];
  const fakeFiles = [
    {
      name: 'file1.txt',
      hash: 'QmVBLeoaAkDsQfYCawFJbvEs2fwUBsCMjpKA8ELdaTC7oC',
    },
    {
      name: 'file2.txt',
      hash: 'QmbyswsHbp3UtziX8FsAdxS1Mgmi75FeT8D7Et9vhkinSM',
    },
  ];
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {
                                }}/>);
  expect(wrapper.find(Sidebar)).to.have.lengthOf(1);
  expect(wrapper.find(Buttons)).to.have.lengthOf(1);
  expect(wrapper.find('img.folder')).to.have.lengthOf(3);
  expect(wrapper.find('img.file')).to.have.lengthOf(2);
});
