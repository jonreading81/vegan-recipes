import React, { Component } from 'react';
import { HeroPanel} from 'components';

export default class Loading extends Component {

  static propTypes = {
  }

  render() {
    return (
       <HeroPanel type="post-heading" title="Loading" />
    );
  }
}
