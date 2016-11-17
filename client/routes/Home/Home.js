import Helmet from 'react-helmet';
import React from 'react';

import PageHeading from '../../components/PageHeading';

const Home = () => (
  <div>
    <Helmet title="Home" />
    <PageHeading text="Welcome to React Starter" />
    <img src={require('../../assets/woody.png')} alt="Woody" />
  </div>
);

export default Home;
