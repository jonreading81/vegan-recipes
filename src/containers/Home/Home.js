import React, { PropTypes, Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import {HeroPanel, Loading} from 'components';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import {request as requestGet} from 'redux/modules/articles/view';
import get from 'lodash/get';
import Article from 'helpers/Article';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);

@connect(
  (store) => {
    return {
      article: new Article(get(store.viewArticle, 'entity[0]')),
      isFetching: get(store.viewRecipe, 'isFetching')
    };
  }
)
@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    return dispatch( requestGet('article-1'));
  }
}])
export default class Home extends Component {

  static propTypes = {
    article: PropTypes.string.isRequired,
    isFetching: PropTypes.bool
  }

  render() {
    const {article, isFetching} = this.props;
    const contentComponent = htmlToReactParser.parse('<div>' + article.getContent() + '</div>');
    const subTextComponent = htmlToReactParser.parse('<div>' + article.getSubText() + '</div>');
    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Home"/>
<<<<<<< HEAD
         <If condition={isFetching}>
            <Loading />
          </If>
          <If condition={!isFetching}>
            <HeroPanel image={article.getImage()} audio={config.app.birdsong} title={article.getTitle()}style="image-focus-bottom">
            {subTextComponent}
            </HeroPanel>
            <div className="container">
              <div className="body-copy">{contentComponent}</div>
=======
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
>>>>>>> 7da312eb0aa5384d21e8e12758cfde1974552eb0
            </div>
          </If>
        </div>
    );
  }
}
