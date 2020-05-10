import React from 'react';
import { connect } from 'react-redux';
import { Sidebar, Buttons } from '../../components/containers';

import './style.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="m20 container flex-direction-row">
        <div>
          <Sidebar/>
        </div>
        <div>
          <Buttons/>

        </div>
      </div>
    );
  }
}

export default connect(null, {})(Home);
