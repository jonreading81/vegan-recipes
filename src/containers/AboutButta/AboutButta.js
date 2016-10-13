import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';

export default class AboutButta extends Component {
  render() {
    return (
      <div>
        <Helmet title="About Butta"/>
        <HeroPanel image="butter.jpeg" title="Butta" subTitle="A replacement made from plants for spreading, cooking and baking" style="image-focus-bottom"/>
        <div className="container">
          <div className="body-copy">
            <p className="body-copy-first">What is Butta?</p>
            <p>Butta is a plant based replacement for diary butter.  Classic Butta has a fat content of 80% which is made up coconut oil, rapeseed oil and cocoa butter.  Its melting point is 25&deg;C.  Unlike other margarines and fat spreads Butta tastes and looks just like dairy butter.</p>
            <p className="body-copy-first">Why Butta?</p>
            <p>One of the changes we can each make in lowering our environment footprint is switching to plant based foods, in fact this is one of the <a href="http://www.spins.com/insights/trend-watch-2/plant-based-food/" title="Plant based foods, growth opportunities in retail">fastest growing food trends</a>.  Did you know that in the UK <a href="https://www.vegansociety.com/whats-new/news/find-out-how-many-vegans-are-great-britain" title="Find out how many vegans are in Great Britain">a switch to veganism (a lifestyle that avoids using animals human benefit) is the fastest growing lifestyle choice </a>?  Butta is an easy switch for any consumer to make to a plant based alternative.</p>
            <p>Butta is a healthy option.  Coconut oil is good for cholesterol, its high Lauric acid content means that the energy from coconut oil is quickly absorbed into the bloodstream giving a satisfying feeling of fullness.  Lauric acid also has antimicrobial properties which fight viruses and bacterial infections.  Rapeseed oil has the lowest saturated fat content of all plant oils.  Its high mono-unsaturated fat content protects our heart by maintaining good cholesterol levels, additionally it has both omega-3 and omega-6 essential fatty acids which are vital for our maintaining our overall health.  And finally cocoa butter ... </p>
          </div>
        </div>
      </div>
    );
  }
}
