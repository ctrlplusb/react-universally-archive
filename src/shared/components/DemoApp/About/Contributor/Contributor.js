/* @flow */

import React from 'react';

type Props = {
  name: string,
  twitter: string,
};

function Contributor({ name, twitter } : Props) {
  return (
    <a
      href={`https://twitter.com/${twitter}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
  );
}

export default Contributor;
