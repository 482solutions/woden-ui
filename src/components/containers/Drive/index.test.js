import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Dropdown } from 'antd';
import Drive from './index';

Enzyme.configure({ adapter: new Adapter() });
let fakeFolders = [];
let fakeFiles = [];
let versions = {};
let fakeFilesInfo = [];
let fakeFoldersInfo = [];
const fakeParentHash = '567f7d6dc9d1d2ee6f4a3dd53118eda2317e17b437953c2aba665816b69ec753';
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

  fakeFilesInfo = [
    {
      fileHash: '85f42f73d72f9c2f3a414551e9f2bb6acc6d242df3f5e6750e6a57368b78b38e',
      fileName: 'WebStorm Reference Card.pdf',
      fileType: 'application/pdf',
      ownerId: 'DEMo12345eniorfn3o',
      parentFolderHash: '455d2fb5a574f17061d41abeed117b6ef3f60739a295f0cf2a0b0b9f7b49a20c',
      readUsers: ['DEMo12345'],
      versions: [{}],
      writeUsers: [],
    },
    {
      fileHash: '85f42f73d72f9c2f3a414551e9f2bb6acc6d242df3f5e6750e6a57368b78b38e',
      fileName: 'WebStorm Reference Card.pdf',
      fileType: 'application/pdf',
      ownerId: 'DEMo12345eniorfn3o',
      parentFolderHash: '455d2fb5a574f17061d41abeed117b6ef3f60739a295f0cf2a0b0b9f7b49a20c',
      readUsers: ['DEMo12345'],
      versions: [{}],
      writeUsers: [],
    },
  ];
  fakeFoldersInfo = [
    {
      files: [],
      folderHash: '480889de94fd76cae5c50f876fffca5b3c4571605c51f2374de96dba39e408f7',
      folderName: 'njKWENenef',
      folders: [],
      ownerId: 'HJWEci32',
      parentFolderHash: '9bde73ea60e15d2574acf608d148f3d1c5cbd3b5ad05822c0181bb27361fb2e6',
      readUsers: ['HJWEci32232233f2'],
      writeUsers: [],
    },
  ];
});
it('Render without crashing', () => {
  const wrapper = shallow(<Drive folderData={{
    entryFolders: fakeFolders,
    entryFiles: fakeFiles,
    parentHash: fakeParentHash,
    filesInfo: fakeFilesInfo,
    foldersInfo: fakeFoldersInfo,
  }}/>);
  expect(wrapper.find(Dropdown)).to.have.lengthOf(fakeFiles.length + fakeFolders.length);
  expect(wrapper.find('img.folder')).to.have.lengthOf(3);
  expect(wrapper.find('img.file')).to.have.lengthOf(2);
});
it('Simulate click on Context Menu', () => {
  const wrapper = shallow(<Drive folderData={{
    entryFolders: fakeFolders,
    entryFiles: fakeFiles,
    parentHash: fakeParentHash,
    filesInfo: fakeFilesInfo,
    foldersInfo: fakeFoldersInfo,
  }}/>);
  expect(wrapper.find(`#Actions_${fakeFiles[0].hash}`).simulate('click')).to.be.ok;
  expect(wrapper.find(`#Actions_${fakeFiles[1].hash}`).simulate('click')).to.be.ok;
});
it('Simulate double click on Files for download', () => {
  const wrapper = shallow(<Drive folderData={{
    entryFolders: fakeFolders,
    entryFiles: fakeFiles,
    parentHash: fakeParentHash,
    filesInfo: fakeFilesInfo,
    foldersInfo: fakeFoldersInfo,
  }}
                                 downloadFile={() => {
                                 }}
                                 versions={versions}/>);

  expect(wrapper.find('.file').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.file').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(1).simulate('doubleclick')).to.be.ok;
});
it('Simulate double click on Folders for open', () => {
  const wrapper = shallow(<Drive folderData={{
    entryFolders: fakeFolders,
    entryFiles: fakeFiles,
    parentHash: fakeParentHash,
    filesInfo: fakeFilesInfo,
    foldersInfo: fakeFoldersInfo,
  }}
                                 getFolderData={() => {
                                 }} openFolder={() => {
                                 }}/>);
  expect(wrapper.find('.folder').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folder').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(1).simulate('doubleclick')).to.be.ok;
});

it('Check all Dropdown and simulate click', () => {
  const wrapper = shallow(<Drive folderData={{
    entryFolders: fakeFolders,
    entryFiles: fakeFiles,
    parentHash: fakeParentHash,
    filesInfo: fakeFilesInfo,
    foldersInfo: fakeFoldersInfo,
  }}
                                 createFolder={() => {
                                 }}
                                 getFolderData={() => {
                                 }}
                                 detectUserPermission={() => {
                                 }}
                                 versions={versions}/>);
  expect(wrapper.find(Dropdown).at(0).simulate('click')).to.be.ok;
  expect(wrapper.find(Dropdown).at(1).simulate('click')).to.be.ok;
});
