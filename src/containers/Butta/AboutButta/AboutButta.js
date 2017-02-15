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
          <section className="section-color-blue">
            <h2>What is Butta?</h2>
            <p className="intro-1">
            Butta is a plant based replacement for dairy butter and can be used for spreading, cooking and baking.  Butta looks and tastes like dairy butter.  It has a fat content of 75% similar to dairy butter but unlike dairy butter Butta contains 45% saturated, 15% mono-saturated and 18% poly-unsaturated fats making it a healthier choice.</p>
            <p className="intro-1">
            Butta differentiates itself from other margarines because it contains plant milk, not water.  Additionally its core oils are coconut oil and cocoa butter.</p>
            <dl>
                <dt>Butta ingredients:</dt>
                <dd><span className="fa-stack fa-md"><i className="fa fa-check fa-stack-2x"></i></span><span className="dd">GMO (genetically modified organics) free</span></dd>
                <dd><span className="fa-stack fa-md"><i className="fa fa-check fa-stack-2x"></i></span><span className="dd">Dairy free</span></dd>
                <dd><span className="fa-stack fa-md"><i className="fa fa-check fa-stack-2x"></i></span><span className="dd">Lactose free</span></dd>
                <dd><span className="fa-stack fa-md"><i className="fa fa-check fa-stack-2x"></i></span><span className="dd">Gluten free</span></dd>
                <dd><span className="fa-stack fa-md"><i className="fa fa-check fa-stack-2x"></i></span><span className="dd">Palm oil free</span></dd>
                <dd><span className="fa-stack fa-md"><i className="fa fa-check fa-stack-2x"></i></span><span className="dd">No Hexane</span></dd>
                <dd><span className="fa-stack fa-md"><i className="fa fa-check fa-stack-2x"></i></span><span className="dd">No trans or hydrogenated fat</span></dd>
            </dl>
          </section>

          <hr image="Butta-wooden-table.jpeg">
            <h2>Butta an alternative for spreading, cook and baking</h2>
          </hr>
          <section className="section-color-purple intro-list">
            <h2 className="">Why will consumers buy Butta?</h2>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span><em className="pullout-super">The move to plant based alternatives is one of the fastest growing lifestyles in the world.</em></p>
           <p><a href="https://www.vegansociety.com/whats-new/news/find-out-how-many-vegans-are-great-britain">A study by Ipsos MORI in 2016</a> reveals that there are at least 542,000 vegans in Britain, three and a half times as many as there was in 2006.</p>
            <p><a href="http://ucfoodobserver.com/2015/06/04/report-un-urges-global-move-to-meat-and-dairy-free-diet/">United Nations Environment Programme</a> highlighted the strain of agricultural products on the environment back in 2010.  Consumers are becoming increasingly aware that a switch to plant based foods is required to cut gas greenhouse emissions and sustain the ever increasing population.</p>
            <p><a href="https://thinkprogress.org/the-netherlands-new-dietary-guidelines-take-meat-off-the-menu-a97c40f05d84#.qqjmqqj68">New dietary guidelines</a> for the Netherlands, the UK and the US take into account the environmental impact when formulating dietary recommendations promoting plant based-foods over agricultural products.</p>

            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span><em className="pullout-super ">Consumers are choosing foods that contain natural ingredients over 'non-fat' and 'low-fat' varieties because they are seen as a more wholesome and healthier choice.</em></p>
            <p><a href="http://www.alternet.org/food/how-low-fat-foods-actually-made-america-fat">How low-fat foods actually made America fat</a></p>
            <p>An article <a href="https://blendle.com/i/wsj-com/will-margarine-become-toast-at-unilever/bnl-wsj-20160119-SB12115899085733003306504581487633666776002?sharer=eyJ2ZXJzaW9uIjoiMSIsInVpZCI6ImFteW12YXJnYSIsIml0ZW1faWQiOiJibmwtd3NqLTIwMTYwMTE5LVNCMTIxMTU4OTkwODU3MzMwMDMzMDY1MDQ1ODE0ODc2MzM2NjY3NzYwMDIifQ%3D%3D">in The Wallstreet Journal</a> reports butter's resurgence over margarine (2016)</p>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span><em className="pullout-super">Consumers are making product choices based on the overall impact of the product on the environment most importantly, sustainability.</em></p>
            <p>One of Butta's core values is to source ingredients from ethical and sustainable suppliers.</p>
            <p>The European Margarine Association highlights the importance of sustainability <a href="http://imace.org/wp-content/uploads/2016/05/IMACE_Newsletter_lay-out-A4_MAI_v4.pdf">as a key concept for society, business and policy makers</a>.</p>
            <p><a href="http://www.baltimoresun.com/business/bs-bz-supermarket-sustainable-food-trend-20170127-story.html">Giant Food introduces a ratings system </a>that measures the sustainability of food.</p>
        </section>
        <hr image="Cocoa-beans.jpeg">
            <h2>Plant based food product sales topped $4.9B in 2016, growing 3.4% since 2015< br/><a href="http://www.spins.com/plant-based-foods-webinar/">Spins Plant Based Foods Growth Opportunities in Retail</a></h2>
        </hr>
        <section className="section-color-blue intro-list">
            <h2 className="">Why will retailers choose Butta</h2>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-gbp fa-stack-2x"></i></span><em className="pullout-super ">Sales of plant based foods have outperformed all expectations</em></p>
            <p>Sainsbury's vegan cheeses <a href="http://www.sainsburysmagazine.co.uk/blog/item/10-things-you-need-to-know-about-going-vegan">outperformed projected sales targets by 300%</a></p>
            <p>Zizzi restaurants <a href="https://www.thecaterer.com/articles/495103/zizzi-reports-150-increase-in-vegan-dish-sales">reported a 150% increase in vegan dish sales.</a></p>
            <p><a href="http://www.tidefordorganics.com/">Tide Ford Organics</a> have revamped their range to be completely vegan.</p>
            <p><a href="https://www.pret.co.uk/en-gb/little-veggie-pop-up">Pret's Veggie Store</a> is so popular it is here to stay.</p>
            <p>Even <a href="http://www.benjerry.com/flavors/non-dairy">Ben and Jerry's</a> has a non-dairy flavours.</p>
            <p>67% of consumers in the US choose plant based milks because they like the taste of it and 65% of consumers choose plant based milks because it's healthier than dairy.</p>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-gbp fa-stack-2x"></i></span><em className="pullout-super">As margarine sales flatten, Butta offers a plant based alternative that not only looks, tastes and behaves like dairy butter but offers all the benefits of plant based oils.</em></p>
            <p>Retail butter compound annual growth rate (CAGR) forecast for 2015-2020 is 0.4% compared with margarine's -0.6%.  Butta bridges the gap between the popularity of plant based foods and the resurgence in butter sales.</p>
        </section>
        <hr image="Girl-loves-cow.jpeg">
            <h2>Vegans are inspired by health, the environment and animal welfare</h2>
        </hr>
        <section className="section-color-blue intro-list">
            <h2 className="">Who is the target market for Butta</h2>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span><em className="pullout-super ">Millenials (born between 1977 and 2000)</em></p>
            <p><a href="https://www.vegansociety.com/whats-new/news/find-out-how-many-vegans-are-great-britain">A study by Ipsos MORI in 2016</a>reveals that 42% of all vegans in the UK are between the ages of 18 and 34.</p>
            <p><a href="http://www.spins.com/plant-based-foods-webinar/">Spins Plant Based Foods Growth Opportunities in Retail</a> reports that in the US 1 in 10 millenials (born between 1977 and 2000) are vegan and vegetarian.</p>
            <p className="intro intro-3"><span className="fa-stack fa-lg"><i className="fa fa-lightbulb-o fa-stack-2x"></i></span><em className="pullout-super ">Living in urban and suburban areas</em></p>
            <p>In the UK 82% of all vegans live in urban and suburban areas and London contains 22% of all vegans.</p>
        </section>
          <section className="section-color-red">
            <h2>What makes Butta healthy?</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="promo">
                  <div className="promo-image-wrapper">
                    <img src="http://blog.calloftheforest.com/wp-content/uploads/2016/10/cocoanut.png" width="138" height="89" className="image-center" />
                  </div>
                  <h4>Coconut oil (28%)</h4>
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
        </ButtaPage>
        </If>
      </div>
    );
  }
}
