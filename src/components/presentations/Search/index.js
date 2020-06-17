import React from 'react';
import { Input } from 'antd';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchFile = this.searchFile.bind(this);
  }

   async searchFile(value) {
    if(value.trim().length !== 0) {
     await this.props.onSearch(value);
    }
  }

  render() {
    return (
      <Input.Search
        className="searchElements"
        placeholder="Input folder or file name for search"
        enterButton="Search"
        size="large"
        onSearch={this.searchFile}
      />
    );
  }
}

export default Search;
