import React from 'react';
import { connect } from "react-redux";
import { actions } from "../../state-management";

import './style.css';

class Home extends React.Component {
  componentDidMount() {
    this.props.getFullTree();
  }

  render() {
    return (
      <div className="m20">

      </div>
    );
  }
}

export default connect(null, { getFullTree: actions.getFullTree })(Home);
