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
it('Render without crashing', () => {
  const wrapper = shallow(<Drive folders={fakeFolders} files={fakeFiles}/>);
  expect(wrapper.find(Dropdown)).to.have.lengthOf(fakeFiles.length + fakeFolders.length);
  expect(wrapper.find('img.folder')).to.have.lengthOf(3);
  expect(wrapper.find('img.file')).to.have.lengthOf(2);
});
it('Simulate click on Context Menu', () => {
  const wrapper = shallow(<Drive folders={fakeFolders} files={fakeFiles}/>);
  expect(wrapper.find(`#Actions_${fakeFiles[0].hash}`).simulate('click')).to.be.ok;
  expect(wrapper.find(`#Actions_${fakeFiles[1].hash}`).simulate('click')).to.be.ok;
});
it('Simulate double click on Files for download', () => {
  const wrapper = shallow(<Drive folders={fakeFolders} files={fakeFiles}
                                downloadFile={() => {}}
                                versions={versions}/>);
  expect(wrapper.find('.file').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.file').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.fileTitle').at(1).simulate('doubleclick')).to.be.ok;
});
it('Simulate double click on Folders for open', () => {
  const wrapper = shallow(<Drive folders={fakeFolders} files={fakeFiles}
                                getFolderData={() => {}} openFolder={() => {}}/>);
  expect(wrapper.find('.folder').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folder').at(1).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(0).simulate('doubleclick')).to.be.ok;
  expect(wrapper.find('.folderTitle').at(1).simulate('doubleclick')).to.be.ok;
});

it('Check all Dropdown and simulate click', () => {
  const wrapper = shallow(<Drive folders={fakeFolders} files={fakeFiles}
                                createFolder={() => {}} getFolderData={() => {}}
                                versions={versions}/>);
  expect(wrapper.find(Dropdown).at(0).simulate('click')).to.be.ok;
  expect(wrapper.find(Dropdown).at(1).simulate('click')).to.be.ok;
});
