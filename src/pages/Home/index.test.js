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
let versions = {};
beforeAll(() => {
  versions = {
    versionList: [
      {
        cid: 'QmRxjZDSaMdKTuGDrXYGVdzK2HHpH36K2pBoEoDunTxoTY',
        time: 1590657618,
      },
      {
        cid: 'QmeUcNsfqve3d9QVNieqHjbEWk6CqtqwAixkg3ecFVKtH5',
        time: 1590657000,
      },
    ],
  };

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
      versions: [{ cid: 'QmRxjZDSaMdKTuGDrXYGVdzK2HHpH36K2pBoEoDunTxoTY', time: 1590657618000 }],
    },
    {
      name: 'file2.txt',
      hash: 'QmbyswsHbp3UtziX8FsAdxS1Mgmi75FeT8D7Et9vhkinSM',
      versions: [{ cid: 'QmeUcNsfqve3d9QVNieqHjbEWk6CqtqwAixkg3ecFVKtH5', time: 1590657000000 }],
    },
  ];
});
it('Renders "Home" check all components', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {
                                }} versions={versions}/>);
  // expect(wrapper.find(Sidebar)).to.have.lengthOf(1);
  expect(wrapper.find(Buttons)).to.have.lengthOf(1);
  expect(wrapper.find(Dropdown)).to.have.lengthOf(fakeFiles.length);
  expect(wrapper.find('img.folder')).to.have.lengthOf(3);
  expect(wrapper.find('img.file')).to.have.lengthOf(2);
  wrapper.setState({ shareModalVisible: true });
});
it('Simulate click on Context Menu', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {
                                }} versions={versions}/>);
  expect(wrapper.find(`#Actions_${fakeFiles[0].hash}`).simulate('click')).to.be.ok;
  expect(wrapper.find(`#Actions_${fakeFiles[1].hash}`).simulate('click')).to.be.ok;
});
it('Simulate double click on Files for download', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {}} downloadFile={() => {}}
                                versions={versions}/>);
  expect(wrapper.find('.file').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.file').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(1).simulate('doubleclick')).to.be.ok;
});
it('Simulate double click on Folders for open', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                getFolderData={() => {}} versions={versions}/>);
  expect(wrapper.find('.folder').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folder').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(1).simulate('doubleclick')).to.be.ok;
});
it('Check uploadFile method', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                uploadFile={() => {}} getFolderData={() => {}}
                                versions={versions}/>);
  const instance = wrapper.instance();
  expect(instance.uploadFile(fakeFiles[0].hash)).to.equal(false);
});
it('Check createFolder method', () => {
  const dataRequest = {
    newFolder: 'Test1',
  };
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                createFolder={() => {}} getFolderData={() => {}}
                                versions={versions}/>);
  const instance = wrapper.instance();
  expect(instance.createFolder(dataRequest)).to.equal(undefined);
});
it('Open file version Wrapper', () => {
  const time = new Date(versions.versionList[0].time * 1000).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: 'numeric',
    hour12: false,
    minute: '2-digit',
  });
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                createFolder={() => {}} getFolderData={() => {}}
                                versions={versions}/>);
  const instance = wrapper.instance();
  expect(wrapper.find(`#Actions_${fakeFiles[0].hash}`).simulate('click')).to.be.ok;
  expect(instance.getVersions(fakeFiles[0].hash, fakeFiles[0].name)).to.be.ok;
  expect(wrapper.find(`#CID_${versions.versionList[0].cid}`).text()).to.equal(versions.versionList[0].cid);
  expect(wrapper.find(`#Time_${versions.versionList[0].cid}`).text()).to.equal(time);
  expect(wrapper.find(`#Download_${versions.versionList[0].cid}`)).to.have.lengthOf(1);
});
it('Check all Dropdown and simulate click', () => {
  const wrapper = shallow(<Home entryFolders={fakeFolders} entryFiles={fakeFiles}
                                createFolder={() => {}} getFolderData={() => {}}
                                versions={versions}/>);
  expect(wrapper.find(Dropdown).at(0).simulate('click')).to.be.ok;
  expect(wrapper.find(Dropdown).at(1).simulate('click')).to.be.ok;
});
