import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import { Buttons, Sidebar, Drive } from '../../components/containers';
import { Home } from './index';
Enzyme.configure({ adapter: new Adapter() });
let drive = [];
const entryFolders = [];
const entryFiles = [];
let versions = {};
beforeAll(() => {
  versions = {
    versionList: [
      {
        cid: 'QmRxjZDSaMdKTuGDrXYGVdzK2HHpH36K2pBoEoDunTxoTY',
        time: 1590657618,
        user: 'Test1',
      },
      {
        cid: 'QmeUcNsfqve3d9QVNieqHjbEWk6CqtqwAixkg3ecFVKtH5',
        time: 1590657000,
        user: 'Test2',
      },
    ],
  };
  drive = {
    entryFolders: [
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
    ],
    entryFiles: [
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
    ],
  };
});
it('Check createFolder method', () => {
  const dataRequest = {
    newFolder: 'Test1',
  };
  const wrapper = shallow(<Home drive={drive}
                                entryFolders={entryFolders}
                                entryFiles={entryFiles}
                                createFolder={() => {
                                }}
                                getFolderData={() => {
                                }}
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
  const wrapper = shallow(<Home drive={drive}
                                entryFolders={entryFolders}
                                entryFiles={entryFiles}
                                createFolder={() => {
                                }}
                                getFolderData={() => {
                                }}
                                versions={versions}
                                getPermission={() => {
                                }}/>);
  const instance = wrapper.instance();
  expect(instance.getVersions(drive.entryFiles[0].hash, drive.entryFiles[0].name)).to.be.ok;
  expect(wrapper.find(`#CID_${versions.versionList[0].cid}`).text())
    .to
    .equal(versions.versionList[0].cid);
  expect(wrapper.find(`#Time_${versions.versionList[0].cid}`).text()).to.equal(time);
  expect(wrapper.find(`#Download_${versions.versionList[0].cid}`)).to.have.lengthOf(1);
});
it('Renders "Home" check all components', () => {
  const wrapper = shallow(<Home drive={drive} getFolderData={() => {
  }} versions={versions}/>);
  expect(wrapper.find(Sidebar)).to.have.lengthOf(1);
  expect(wrapper.find(Buttons)).to.have.lengthOf(1);
  expect(wrapper.find(Drive)).to.have.lengthOf(1);
  wrapper.setState({ shareModalVisible: true });
});
