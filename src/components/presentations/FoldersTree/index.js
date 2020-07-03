import React from 'react';
import { Tree } from 'antd';

const { DirectoryTree } = Tree;
const foldersTree = [
  {
    name: "richard",
    hash: "61bffea9215f65164ad18b45aff1436c0c165d0d5dd2087ef61b4232ba6d2c1a",
    folders: [
      {
        name: "fff",
        hash: "7018ad3b2ee9ba9e15dd3e9e93f75893fdfd18d800a85db439fd6cef733b9d2d",
        folders: [
          {
            name: "bgbg",
            hash: "426e1b87a9ed5829d00c3f6a03c0cd218064e3208f286d6c35bc8009dd168773",
            folders: [
              {
                name: "gbgeaaa",
                hash: "b107cb6ee163a4d7ee8391ceb7996634bf6e285d423e9911a4d5b979057ef45b",
                folders: [
                  {
                    name: "vfvvdssfA",
                    hash: "2856b8793f83e84bd8dfaf4e8de24e41e89e1b226f6aa49145885a4fe530c05f",
                    folders: []
                  }
                ]
              }
            ]
          },
          {
            name: "gbgtbgb",
            hash: "f085faed10a4a15344d13e69b0e75cdfe18bac2ca54d9019b0e0d3b6cab117e5",
            folders: []
          }
        ]
      },
      {
        name: "dfd",
        hash: "00fd446056e71525ca3415251906ab7df91ceea6687d32e6497d81ba1f7e619d",
        folders: []
      }
    ]
  }
]

export const FolderTree = () => {
  console.log('log from tree');
  return (
    <DirectoryTree
      treeData={foldersTree}
    />
  )
}

export default FolderTree;
