import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Upload, Button } from 'antd';
import { FileAddTwoTone } from '@ant-design/icons';
import { NewFolder } from '..';
import Buttons from './index';

Enzyme.configure({ adapter: new Adapter() });
let fakeFolders = [];
let fakeFiles = [];
let versions = {};
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
});
it('Renders components Buttons', () => {
  const wrapper = shallow(<Buttons
    folderData={{ entryFolders: fakeFolders, entryFiles: fakeFiles, parentHash: fakeParentHash }} mode={'drive'}/>);
  expect(wrapper.find('.homeButtons')).to.have.lengthOf(1);
  expect(wrapper.find('.upload-button')).to.have.lengthOf(1);
  expect(wrapper.find(Upload)).to.have.lengthOf(1);
  expect(wrapper.find(Button)).to.have.lengthOf(1);
  expect(wrapper.find(FileAddTwoTone)).to.have.lengthOf(1);
  expect(wrapper.find(NewFolder)).to.have.lengthOf(1);
  expect(wrapper.find('.goHome')).to.have.lengthOf(1);
  expect(wrapper.find('.goBack')).to.have.lengthOf(1);
  expect(wrapper.find('.currentFolder')).to.have.lengthOf(1);
});

it('Check uploadFile method', () => {
  const wrapper = shallow(<Buttons
    folderData={{ entryFolders: fakeFolders, entryFiles: fakeFiles, parentHash: fakeParentHash }}
    uploadFile={() => {
    }}
  />);
  wrapper.instance().beforeUpload();
});

it('Check goHome method', () => {
  const wrapper = shallow(<Buttons
    folderData={{ entryFolders: fakeFolders, entryFiles: fakeFiles, parentHash: fakeParentHash }}
    goHome={() => {
    }}
  />);
  wrapper.instance().goHome();
});

it('Check goHome method', () => {
  const wrapper = shallow(<Buttons
    folderData={{ entryFolders: fakeFolders, entryFiles: fakeFiles, parentHash: fakeParentHash }}
    goHome={() => {
    }}
  />);
  wrapper.instance().goHome();
});

it('Check goBack method', () => {
  const wrapper = shallow(<Buttons
    folderData={{ entryFolders: fakeFolders, entryFiles: fakeFiles, parentHash: fakeParentHash }}
    goHome={() => {
    }}
  />);
  wrapper.instance().goBack();
});
