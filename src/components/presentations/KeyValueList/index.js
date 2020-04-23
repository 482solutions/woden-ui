import React from 'react';

export default ({ list }) => (
  <>
    {Object.entries(list).map(([key, value]) => (
      <div className="flex-between" key={key}>
        <span>{key}</span>
        <span>{value}</span>
      </div>
    ))}
  </>
);
