import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import {ButtaPage} from 'components';
import {request as requestPage} from 'redux/modules/wordpress/page';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);
import ArticleHelper from 'helpers/Article';
import { asyncConnect } from 'redux-async-connect';
import {connect} from 'react-redux';
import get from 'lodash/get';

@connect(
  (state) => {
    return {
      isFetching: get(state.viewPage, 'isFetching'),
      page: new ArticleHelper(get(state.viewPage, 'entity.docs[0]')),
    };
  }
)
@asyncConnect([
  {
    promise: ({store: {dispatch}}) => {
      return dispatch(requestPage('about-butta'));
    }
  },
])
export default class AboutButta extends Component {

  static propTypes = {
    page: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired
  }

  render() {
    const {page, isFetching} = this.props;
    htmlToReactParser.parse('<div>' + page.getContent() + '</div>');
    return (
      <div>
        <Helmet title="About Butta"/>
        <If condition={!isFetching}>
          <ButtaPage selected="about">
          <h2 className="color-green">What is Butter?</h2>
          <p className="intro-1">
          Butta is a plant based replacement for dairy butter; it looks and tastes just like traditional diary butter. It has a fat content of 80% and a melting point of 25°C.
          </p>
          <hr image="/images/1248x702/forest.jpeg">
            <h1>Amy is the Best at Butta ...</h1>
          </hr>
          <h2 className="color-green">What is Butter made of?</h2>

          <div className="row">
            <div className="col-md-4">
              <div className="promo">
                <div className="promo-image-wrapper">
                  <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/cocoanut.png" width="138" height="89" className="image-center" />
                </div>
                <h4>Coconut oil (27%)</h4>
                <p>Coconut oil is <em className="pullout color-green">good for cholesterol</em>, its high Lauric acid content means that its energy is absorbed quickly giving a <em className="pullout color-green">satisfying</em> feeling of fullness. It also has <em className="pullout color-green">antimicrobial</em> properties which fight viruses and bacterial infections.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="promo">
                <div className="promo-image-wrapper">
                  <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/canola.png" height="89" className="image-center" />
                </div>
                <h4>Canola oil (26%)</h4>
                <p>Canola oil has the <em className="pullout color-green">lowest saturated fat</em> content of all plant oils. Its beneficial high mono-unsaturated fat content protects our heart by maintaining good cholesterol levels and it contains both <em className="pullout color-green">omega-3</em> and <em className="pullout color-green">omega-6</em> essential fatty acids.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="promo">
                <div className="promo-image-wrapper">
                  <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/cocoa.png" width="138" height="89" className="image-center" />
                </div>
                <h4>Cocoa butter (21%)</h4>
                <p>Cocoa butter is an excellent source of natural <em className="pullout color-green">anti-oxidants</em>, omega-3 and omega-6 essential fatty acids as well as nutrients that enhance the mood and <em className="pullout color-green">immune system</em>.</p>
              </div>
            </div>
          </div>
          <hr image="/images/1248x702/forest.jpeg">
            <h1>Amy is the Best at Butta ...</h1>
          </hr>
          <h2 className="color-green">Why Butta?</h2>
          <p className="intro-3">Switching to plant based is one of the <em className="pullout-super color-green">fastest growing</em>  food trends, Butta is an <em className="pullout-super color-green">easy</em> and <em className="pullout-super color-green">convenient</em> switch consumers can make to a plant based alternative. </p>

          <p className="intro-3"><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span>Did you know that in the UK veganism (a lifestyle that avoids using animals for human benefit) is the <em className="pullout-super color-green">fastest growing</em>  lifestyle movement?</p>
        </ButtaPage>
        </If>
      </div>
    );
  }
}
