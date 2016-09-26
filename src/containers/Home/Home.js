import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';

const dharmaocean = 'https://www.dharmaocean.org/';

export default class Home extends Component {
  render() {
    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Home"/>
          <HeroPanel image="forest.jpeg" title={config.app.title} style="image-focus-bottom">
          <span className="subheading">The forest can be a metaphor for a spirit of freedom attainable within any lifestyle <cite><a href={dharmaocean}>DharmaOcean.org</a></cite></span>
          </HeroPanel>
            <audio controls>
              <source src={config.app.birdsong} type="audio/mp3" />
            </audio>
          <div className="container">
            <div className="body-copy">
              <p className="body-copy-first important">
              What does the forest bring to mind when you quiet your mind and allow your imaginations to roam freely?</p>
              <p>
              Do you hear the whisper of swaying trees rising above you?  Do you see dancing sun beams gleaming on leaf covered tracks?  The ever present knowing that the forest provides a sustainable home for all its inhabitants.  The glimpse of rabbits, mice, hedgehogs and moles who make their homes amongst the interconnected web of roots underfoot, the giggling gurgling of a sparkling stream, the chirping and singing of birds and with the setting sun a closing blackness whose only solace are silver beams of moonshine.
              </p>
              <blockquote>
              The forests are calling us to return to our authentic selves.  It is not so much giving up on our modern culture but more that we now take the time to <strong>listen</strong> to our inner selves, to <strong>feel</strong> rather than think, to <strong>be</strong> rather than do.  Then we hear our hearts calling for our freedom, a freedom that we are all seeking.
              </blockquote>
              </div>
            </div>
        </div>
    );
  }
}
