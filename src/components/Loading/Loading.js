import React, { Component } from 'react';
import { HeroPanel} from 'components';

export default class Loading extends Component {

  static propTypes = {
  }

  render() {
    return (
       <HeroPanel type="post-heading" title="Loading">
        <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span>
       </HeroPanel>
    );
  }
}
