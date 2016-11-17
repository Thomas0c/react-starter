import React, { PropTypes } from 'react';

const Html = ({ assets, content, head, initialState }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      {head.meta.toComponent()}
      {head.title.toComponent()}
      {Object.keys(assets.styles).map((style, i) =>
        <link
          href={assets.styles[style]}
          key={i}
          media="screen, projection"
          rel="stylesheet"
          type="text/css"
        />
      )}
    </head>
    <body>
      <div dangerouslySetInnerHTML={{ __html: content }} id="root" />
      <script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}` }} />
      {Object.keys(assets.javascript).map((script, i) =>
        <script src={assets.javascript[script]} key={i} />
      )}
    </body>
  </html>
);

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
  initialState: PropTypes.object
};

export default Html;
