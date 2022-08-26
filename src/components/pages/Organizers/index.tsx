import * as React from 'react';
import {connect} from 'react-redux';

const Home = () => (
  <div>
    <h1>Hello, world second!</h1>
    <p>Welcome to your new single-page application, built with:</p>
  </div>
);

export default connect()(Home);
