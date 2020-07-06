import React from 'react';

const reduced = (Parent, Provider) => ({ children }) => (
  <Parent>
    <Provider>{children}</Provider>
  </Parent>
);

const ReduceProviders = ({ providers, children }) => {
  const ReducedProvider = providers.reduce(reduced);

  return <ReducedProvider>{children}</ReducedProvider>;
};

export default ReduceProviders;