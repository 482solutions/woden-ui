import React from 'react';
import {connect} from 'react-redux';
import {Breadcrumb} from 'antd';

import { actions } from '../../../state-management';

import './style.css';

const Path = ({ filesystem, goBack, showPermissions }) => (
  <Breadcrumb>
    {
      filesystem.directory.split('/').map((element, i, arr) => (
        <Breadcrumb.Item
          className={i !== arr.length - 1 ? "breadcrumb-item_clickable transition" : ""}
          onClick={i !== arr.length - 1 ? (() => goBack(element)) : null}
          key={element}
        >
          {/*{element}*/}
          {/*{*/}
          {/*  i === arr.length - 1 && element !== 'shared' && arr[i - 1] !== 'shared' && (*/}
          {/*    <Icon*/}
          {/*      type="team"*/}
          {/*      className="breadcrumb-item__permissions"*/}
          {/*      style={{*/}
          {/*        fontSize: 16*/}
          {/*      }}*/}
          {/*      onClick={() => showPermissions(arr.slice(0, i + 1).join('/'))}*/}
          {/*    />*/}
          {/*  )*/}
          {/*}*/}
        </Breadcrumb.Item>
      ))
    }
  </Breadcrumb>
);

export default connect(({ filesystem }) => ({ filesystem }), {
  goBack: actions.goBack,
  showPermissions: actions.showPermissions,
})(Path)
