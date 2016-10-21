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
          <section className="section-color-green">
            <h2>What is Butta?</h2>
            <p className="intro-1">
            Butta is a plant based replacement for dairy butter; it looks and tastes just like traditional diary butter. It has a fat content of 80% and a melting point of 25°C.
            </p>
          </section>

          <hr image="mountain-lake.jpeg">
            <h2>Butta is Natural and unprocessed</h2>
          </hr>
          <section className="section-color-red">
            <h2 >What is Butta made of?</h2>

            <div className="row">
              <div className="col-md-4">
                <div className="promo">
                  <div className="promo-image-wrapper">
                    <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/cocoanut.png" width="138" height="89" className="image-center" />
                  </div>
                  <h4>Coconut oil (27%)</h4>
                  <p>Coconut oil is <em className="pullout ">good for cholesterol</em>, its high Lauric acid content means that its energy is absorbed quickly giving a <em className="pullout ">satisfying</em> feeling of fullness. It also has <em className="pullout ">antimicrobial</em> properties which fight viruses and bacterial infections.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="promo">
                  <div className="promo-image-wrapper">
                    <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/canola.png" height="89" className="image-center" />
                  </div>
                  <h4>Canola oil (26%)</h4>
                  <p>Canola oil has the <em className="pullout ">lowest saturated fat</em> content of all plant oils. Its beneficial high mono-unsaturated fat content protects our heart by maintaining good cholesterol levels and it contains both <em className="pullout ">omega-3</em> and <em className="pullout ">omega-6</em> essential fatty acids.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="promo">
                  <div className="promo-image-wrapper">
                    <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/cocoa.png" width="138" height="89" className="image-center" />
                  </div>
                  <h4>Cocoa butter (21%)</h4>
                  <p>Cocoa butter is an excellent source of natural <em className="pullout ">anti-oxidants</em>, omega-3 and omega-6 essential fatty acids as well as nutrients that enhance the mood and <em className="pullout ">immune system</em>.</p>
                </div>
              </div>
            </div>
          </section>
           <hr image="butter.jpeg">
            <h2>The UK retail butter market is worth £743 million</h2>
          </hr>
          <section className="section-color-purple intro-list">
            <h2 className="">Why Butta?</h2>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-check fa-stack-1x"></i></span>Switching to plant based is one of the fastest growing food trends, Butta is an <em className="pullout-super ">easy</em> and <em className="pullout-super ">convenient</em> switch consumers can make to a plant based alternative. </p>

            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span>Did you know that in the UK veganism (a lifestyle that avoids using animals for human benefit) is the <em className="pullout-super ">fastest growing</em>  lifestyle movement?</p>

            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-envira fa-stack-1x"></i></span>The <em className="pullout-super ">United Nations</em> Environment Programme highlights the strain that agricultural product puts on our <em className="pullout-super ">environment</em>: a staggering 70% of the global freshwater consumption, 38% of the total land use, and 14% of the world’s <em className="pullout-super ">greenhouse gas</em> emissions come from agricultural production.</p>

        </section>
          <hr image="sky.jpeg">
            <h2>The Sky is the limit</h2>
          </hr>
          <section className="section-color-turquoise intro-list">
            <h2 className="">How will retailers benefit by stocking Butta</h2>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-gbp fa-stack-2x"></i></span> The UK retail butter market is worth <em className="pullout-super ">£743 million</em> (this excludes the foodservice industry) with a <em className="pullout-super ">compound annual growth rate</em> (CAGR) forecast for 2015-2020 of 0.4%. The per capita volume consumption of butter 2.2kg.</p>

            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-gbp fa-stack-2x"></i></span> The UK margarine and spreads market is worth <em className="pullout-super ">£637 million</em> (2016) with a CAGR forecast for 2016-2021 of -0.6%. Per capita volume consumption is 4.6kg. Three leading brands account for over 40% market share: Flora (Unilever), Dairy Crest Clover (Dairy Crest Group), I Can’t Believe it’s Not Butter (Unilever).</p>

            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-check fa-stack-1x"></i></span>Whilst margarine sales remain flat and butter gains <em className="pullout-super ">popularity</em> because of its <em className="pullout-super ">unprocessed nature</em>, Butta offers a plant based alternative that not only looks, tastes and behaves like dairy butter but offers all the <em className="pullout-super ">benefits</em> of plant based oils.</p>
        </section>
        </ButtaPage>
        </If>
      </div>
    );
  }
}
