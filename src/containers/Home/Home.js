import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';
import {Col} from 'react-bootstrap';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Home"/>
          <HeroPanel image="forest.jpeg" title={config.app.title} subTitle={config.app.description}/>
          <div className="container">
              <Col className={styles.copy} xs="11" xsOffset="1" md="8" mdOffset="2" lg="10" lgOffset="1">
              <p className={styles.intro}>Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.</p>

              <blockquote>The dreams of yesterday are the hopes of today and the reality of tomorrow. Science has not yet mastered prophecy. We predict too much for the next year and yet far too little for the next ten.</blockquote>
              <p>Science cuts two ways, of course; its products can be used for both good and evil. But there's no turning back from science. The early warnings about technological dangers also come from science.</p>
                  <h2 className="section-heading">The Final Frontier</h2>
              <p>What was most significant about the lunar voyage was not that man set foot on the Moon but that they set eye on the earth.</p>

              <p>A Chinese tale tells of some men sent to harm a young girl who, upon seeing her beauty, become her protectors rather than her violators. That's how I felt seeing the Earth for the first time. I could not help but love and cherish her.</p>

              <p>For those who have seen the Earth from space, and for the hundreds and perhaps thousands more who will, the experience most certainly changes your perspective. The things that we share in our world are far more valuable than those which divide us.</p>

              <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>

              <p>There can be no thought of finishing for ‘aiming for the stars.’ Both figuratively and literally, it is a task to occupy the generations. And no matter how much progress one makes, there is always the thrill of just beginning.</p>
                </Col>
            </div>
        </div>
    );
  }
}
