import React from 'react';
import {connect} from 'react-redux';
import {functions} from "../../../utils";
import {CardWithList} from "../../presentations";

const defaultCount = {
  files: 0,
  folders: 0,
};

class Stats extends React.Component {
  getStats = () => {
    let { directory, entries, selected } = this.props.filesystem;
    directory = selected.type ? `${directory}/${selected.name}` : directory;
    const currentDir = functions.getCurrentDirectory(directory, entries);
    return currentDir.reduce((prev, curr) => {
      if (typeof curr !== 'string') prev.folders += 1;
      else prev.files += 1;
      return prev;
    }, { ...defaultCount });
  };

  render() {
    const {selected} = this.props.filesystem;
    return (
      <CardWithList
        selected={selected}
        list={this.getStats()}
      />
    );
  }
}

export default connect(({ filesystem }) => ({ filesystem }))(Stats);