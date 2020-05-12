import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Buttons, Data } from '../../components/containers';

import './style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="container flex-direction-row">
        <div>
          <Sidebar/>
        </div>
        <div className="main flex-direction-column w100">
          <Buttons/>
          <Data/>
        </div>
      </div>
    );
  }
}

export default connect(null, {})(Home);
