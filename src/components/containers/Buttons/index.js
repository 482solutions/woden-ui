import React, { Component } from 'react';
import { NewFolder, FileUpload } from '../../containers';
import './style.css';

class Buttons extends Component {
  render() {
    return (
      <div className="buttons">
        <FileUpload/>
        <NewFolder onFinish={this.createDirectory}/>
      </div>
    );
  }
}

export default Buttons;
