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

          <h2 className="color-green">What is Butter made of?</h2>

           <div className="row row-space">
            <div className="col-md-4">
            <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/cocoanut.png" width="138" height="89" />
            <h3>Coconut oil (27%)</h3>
            <p>Coconut oil is <em className="pullout color-green">good for cholesterol</em>, its high Lauric acid content means that its energy is absorbed quickly giving a <em className="pullout color-green">satisfying</em> feeling of fullness. It also has <em className="pullout color-green">antimicrobial</em> properties which fight viruses and bacterial infections.</p>
            </div>
            <div className="col-md-4">
            <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/canola.png" height="89" />
            <h3>Canola oil (26%)</h3>
            <p>Canola oil has the <em className="pullout color-green">lowest saturated fat</em> content of all plant oils. Its beneficial high mono-unsaturated fat content protects our heart by maintaining good cholesterol levels and it contains both <em className="pullout color-green">omega-3</em> and <em className="pullout color-green">omega-6</em> essential fatty acids.</p>
            </div><div className="col-md-4">
            <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/cocoa.png" width="138" height="89" />
            <h3>Cocoa butter (21%)</h3>
            <p>Cocoa butter is an excellent source of natural <em className="pullout color-green">anti-oxidants</em>, omega-3 and omega-6 essential fatty acids as well as nutrients that enhance the mood and <em className="pullout color-green">immune system</em>.</p>
            </div>
          </div>

           <h2 className="color-green">Why Butta?</h2>
          <p>Switching to plant based is one of the <em className="pullout-super color-green">fastest growing</em>  food trends, Butta is an <em className="pullout-super color-green">easy</em> and <em className="pullout-super color-green">convenient</em> switch consumers can make to a plant based alternative. </p>

          <p><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span>Did you know that in the UK veganism (a lifestyle that avoids using animals for human benefit) is the <em className="pullout-super color-green">fastest growing</em>  lifestyle movement?</p>

           <h1>Heading 1</h1>
           <h2>Heading 2</h2>
           <h3>Heading 3</h3>
           <h1>Colors</h1>
           <h3 className="color-purple">Purple</h3>
           <h3 className="color-green">Green</h3>
           <h3 className="color-green">Red</h3>
           <h3 className="color-turquoise">Turquoise</h3>
          <h1>Grid</h1>
          <div className="show-grid row">
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
          </div>
          <div className="show-grid row">
            <div className="col-md-8">.col-md-8</div>
            <div className="col-md-4">.col-md-4</div>
          </div>
          <div className="show-grid row">
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
          </div>
          <div className="show-grid row">
            <div className="col-md-6">.col-md-6</div>
            <div className="col-md-6">.col-md-6</div>
          </div>

          <h1>Intro 1</h1>
          <p className="intro-1 color-turquoise">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <h1>Intro 2</h1>
          <p className="intro-2 color-purple">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <h1>Intro 3</h1>
          <p className="intro-3 color-green">
           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
         <h1>Lists</h1>
         <ul>
         <li>List Item 1</li>
         <li>List Item 2</li>
         <li>List Item 3</li>
         <li>List Item 4</li>
         </ul>
         <h1>Blockquotes</h1>
         <blockquote>
         Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
         </blockquote>
         <h1>Em</h1>
         <p>
         We use only the very best whole <em className="pullout color-purple">fresh</em> fruit,herbs,
         spices and other <em className="pullout color-green">natural</em> ingredients </p>

         </ButtaPage>
        </If>
      </div>
    );
  }
}
