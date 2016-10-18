import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';
import {Table, Row, Col} from 'react-bootstrap';
import get from 'lodash/get';

/* const nutritionalData = [
  {
    name: '',
    amount: '%',
  }
]; */

const ingredientsData = [
  {
    name: '*Coconut oil',
    amount: '27%'
  },
  {
    name: '*Canola oil',
    amount: '26%'
  },
  {
    name: '*Deodarised cocoa butter',
    amount: '21%'
  },
  {
    name: '*Soy milk (hulled soy beans (7.2%), water)',
    amount: ''
  },
  {
    name: 'Liquid soya lecithin',
    amount: ''
  },
  {
    name: 'Plant based lactic acid',
    amount: ''
  },
  {
    name: 'Sea salt',
    amount: ''
  }
];

export default class DietInformation extends Component {
  render() {
    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Product information"/>
          <HeroPanel image="butter.jpeg" title="Butta" subTitle="A replacement made from plants for spreading, cooking and baking" style="image-focus-bottom"/>
          <div className="container">
            <div className="body-copy">
            <p className="body-copy-first important">Please find below labelling information for classic Butta.</p>

              <Row>
                <Col xs={12} sm={6}>
                {/* <h3>Nutrition</h3>
                 <Table striped>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {nutritionalData.map((item, index) =>
                      <tr key={'ingredient-' + index}>
                        <td>{get(item, 'name')}</td>
                        <td>{get(item, 'amount')}</td>
                      </tr>
                    )}
                  </tbody>
                </Table> */}
                <h3>Manufactured by</h3>
                <p>Butter Foods Ltd<br />
                193A Munster Road, London, SW6 6BY<br />
                Email: amy@calloftheforest.com</p>
                <h3>Usage suggestions</h3>
                <p>Spreading, cooking and baking</p>
                <h3>Storage guidelines</h3>
                <p>Keep refrigerated.  Consume within 3 weeks (see use by date).  Store in freezer for up to 3 months.</p>
              </Col>

              <Col xs={12} sm={6}>
                <h3>Ingredients</h3>
                 <Table striped>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                     {ingredientsData.map((item, index) =>
                      <tr key={'ingredient-' + index}>
                        <td>{get(item, 'name')}</td>
                        <td>{get(item, 'amount')} </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <p className="footnote">* Non-GMO organic ingredients<br />
                Free from dairy and gluten<br />
                <bold>Contains soy</bold></p>
              </Col>
          </Row>
          </div>
        </div>
      </div>
    );
  }
}
