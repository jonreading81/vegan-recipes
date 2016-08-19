import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';

export default class Home extends Component {
  render() {
    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Home"/>
          <HeroPanel image="forest.jpeg" title={config.app.title} subTitle="The forest can be a metaphor for a spirit of freedom attainable within any lifestyle"/>
          <div className="container">
              <div className="body-copy">
              <p className="body-copy-first important">Within India culture, the forest was considered the ideal place for spiritual practice because, in the forest, there are no rules and there are no presiding authorities. The only authority is the chaos of the forest itself.</p>
              <blockquote>
              In the forest, there are no rules and there are no presiding authorities.
              The only authority is the chaos of the forest itself.
              </blockquote>
              <p>
              The only rule is what awaits there for each practitioner, uniquely, to discover. Memories of the past and plans for the future, the psychic infrastructure of civilisation, do not apply: they have no bearing and they have no footing.  The forest is about something else. In the forest, there is only the ever-present possibility of events, encounters, and the insights that emerge directly from reality itself, pure and unpolluted by human wants, expectations, and attitudes.  Uniquely in the forest, the most radical of all human journeys can take place, one which brings us in direct contact with primordial being.
              </p>
              <cite><a href="https://www.dharmaocean.org/">Reginald A. Ray PhD 2014. The Call of the Forest. In: Touching Enlightenment: finding realization in the body.</a></cite>
              </div>
            </div>
        </div>
    );
  }
}
