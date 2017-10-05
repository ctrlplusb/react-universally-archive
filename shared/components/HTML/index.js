/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/html-has-lang */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * The is the HTML shell for our React Application.
 */
function HTML(props) {
  const { htmlAttributes, headerElements, bodyElements, appBodyString, styleElement } = props;

  return (
    <html {...htmlAttributes}>
      <head>
        {headerElements}
        {styleElement}
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{ __html: appBodyString }} />
        {bodyElements}
      </body>
    </html>
  );
}

HTML.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  htmlAttributes: PropTypes.object,
  headerElements: PropTypes.node,
  bodyElements: PropTypes.node,
  appBodyString: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  styleElement: PropTypes.array,
};

HTML.defaultProps = {
  htmlAttributes: null,
  headerElements: null,
  bodyElements: null,
  appBodyString: '',
  styleElement: null,
};

// EXPORT

export default HTML;
