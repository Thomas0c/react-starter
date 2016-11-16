import React, {PropTypes} from 'react';

const PageHeading = ({text}) => (
  <h1>{text} test hello 123</h1>
);

PageHeading.propTypes = {
  text: PropTypes.string.isRequired
};

export default PageHeading;
