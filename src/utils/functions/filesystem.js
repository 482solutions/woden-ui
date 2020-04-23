const emptyDirectory = [];

export const getCurrentDirectory = (directory, entries) => {
  const path = directory.split('/');
  let currentDir = entries;
  if (path.length > 1) {
    const pathSliced = path.slice(1);
    currentDir = pathSliced
      .reduce((prev, curr) => {
        const dir = prev.filter(e => e.directory === curr)[0];
        if (!dir || !dir.entries) {
          return emptyDirectory;
        }
        return dir.entries
      }, entries);
  }
  return currentDir;
};

export const saveToCurrentDirectory = (tree, directory, entry) => {
  const path = directory.split('/');
  if (path.length <= 1) {
    tree.entries.push(entry);
    return tree;
  }

  const pathSliced = path.slice(1);
  tree.entries.forEach(element => {
    if (element.directory === pathSliced[0]) {
      element.entries = saveToCurrentDirectory(element, pathSliced.join('/'), entry).entries;
    }
  });

  return tree;
};
