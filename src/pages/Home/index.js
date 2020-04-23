import React from 'react';
import {connect} from "react-redux";

import {Path, Folders, Files} from "../../components";
import {actions} from "../../state-management";

import './style.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.getFullTree();
  }

  render() {
    return (
      <div className="m20">
        {
          [
            <Path />,
            <Folders key="folders"/>,
            <Files key="files"/>,
          ].map(element => (
            <div className="mb20" key={element.key}>
              {element}
            </div>
          ))
        }
      </div>
    );
  }
}

export default connect(null, { getFullTree: actions.getFullTree })(Home);