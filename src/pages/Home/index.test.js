import React from 'react';
import { Dropdown } from 'antd';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Buttons } from '../../components/containers';
import { Home } from './index';

Enzyme.configure({ adapter: new Adapter() });
let fakeFolders = [];
let fakeFiles = [];
beforeAll(() => {
  fakeFolders = [
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
  fakeFiles = [
    {
      name: 'file1.txt',
      hash: 'QmVBLeoaAkDsQfYCawFJbvEs2fwUBsCMjpKA8ELdaTC7oC',
    },
    {
      name: 'file2.txt',
      hash: 'QmbyswsHbp3UtziX8FsAdxS1Mgmi75FeT8D7Et9vhkinSM',
    },
  ];
});
it('Renders "Home" check all components', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {}}/>);
  // expect(wrapper.find(Sidebar)).to.have.lengthOf(1);
  expect(wrapper.find(Buttons)).to.have.lengthOf(1);
  expect(wrapper.find(Dropdown)).to.have.lengthOf(fakeFiles.length);
  expect(wrapper.find('img.folder')).to.have.lengthOf(3);
  expect(wrapper.find('img.file')).to.have.lengthOf(2);
});
it('Simulate click on Context Menu', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {}}/>);
  expect(wrapper.find(`#Actions_${fakeFiles[0].hash}`).simulate('click')).to.be.ok;
  expect(wrapper.find(`#Actions_${fakeFiles[1].hash}`).simulate('click')).to.be.ok;
});
it('Simulate double click on Files for download', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {
                                }} downloadFile={() => {}}/>);
  expect(wrapper.find('.file').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.file').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(1).simulate('doubleclick')).to.be.ok;
});
it('Simulate double click on Folders for open', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {}}/>);
  expect(wrapper.find('.folder').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folder').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(1).simulate('doubleclick')).to.be.ok;
});
it('Check uploadFile method', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                uploadFile={() => {}} getFolderData={() => {}} />);
  const instance = wrapper.instance();
  expect(instance.uploadFile(fakeFiles[0].hash)).to.be.false;
});
it('Check createFolder method', () => {
  const dataRequest = {
    newFolder: 'Test1',
  };
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                createFolder={() => {}} getFolderData={() => {}} />);
  const instance = wrapper.instance();
  expect(instance.createFolder(dataRequest)).to.equal(undefined);
});
