import React from 'react';
import {CardWrapper, KeyValueList, Loading} from "../index";

export default ({ selected, list, isLoading }) => (
  <CardWrapper
    selected={selected}
  >
    {
      isLoading ? (
        <Loading text="Load data..." />
      ) : (
        <KeyValueList
          list={list}
        />
      )
    }
  </CardWrapper>
)
