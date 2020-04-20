import React from 'react';
import {connect} from 'react-redux';
import { Input } from 'antd';

// TODO: add search
class Search extends React.Component {
  searchFile = (value) => {
    const { filesystem } = this.props;
    const file = 'a';
    console.log(file);
  };

  render() {
    return (
      <Input.Search
        placeholder="Input file for search"
        enterButton="Search"
        size="large"
        onSearch={this.searchFile}
      />
    );
  }
}

export default connect(({ filesystem }) => ({ filesystem }))(Search);
