import React from 'react';
import { connect } from "react-redux";
import Sidebar from '../../components/containers/Sidebar';

import './style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="m20">
        <Sidebar/>
      </div>
    );
  }
}

export default connect(null, {})(Home);
