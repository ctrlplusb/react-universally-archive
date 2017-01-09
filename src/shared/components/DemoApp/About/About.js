import React from 'react';
import { css } from 'glamor';
import Helmet from 'react-helmet';
import Contributor from './Contributor';

const contributors = [
  { name: 'Alin Porumb', twitter: 'alinporumb' },
  { name: 'Benjamin Kniffler', twitter: 'bkniffler' },
  { name: 'Carson Perrotti', twitter: 'carsonp' },
  { name: 'Christian Glombek', twitter: 'LorbusChris' },
  { name: 'Christoph Werner', twitter: 'code_punkt' },
  // TODO: Get David's twitter handle.
  // { name: 'David Edmondson', twitter: '' },
  // TODO: Get Evgeny's twitter handle.
  // { name: 'Evgeny Boxer', twitter: '' },
  { name: 'Joe Kohlmann', twitter: 'jkohlmann' },
  { name: 'Lucian Lature', twitter: 'lucianlature' },
  { name: 'Steven Enten', twitter: 'steven_enten' },
  { name: 'Sean Matheson', twitter: 'controlplusb' },
  { name: 'Steven Truesdell', twitter: 'StruesCO' },
];

const aboutStyles = css`
  text-align: center;
`;

function About() {
  return (
    <div className={aboutStyles}>
      <Helmet title="About" />

      <p>Produced with ❤️ by...</p>

      <ul style={{ marginTop: '1rem' }}>
        {
          contributors.map(({ name, twitter }) =>
            <li key={name}>
              <Contributor name={name} twitter={twitter} />
            </li>,
          )
        }
      </ul>
    </div>
  );
}

export default About;
