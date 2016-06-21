import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Helmet title="Add Recipe"/>
        <div className="container">
        <h1>Add Recipe</h1>
          <h2>Please Add your recipe</h2>
         </div>
      </div>
    );
  }
}
