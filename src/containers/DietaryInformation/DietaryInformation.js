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
    name: '*coconut oil',
    amount: ''
  },
  {
    name: '*rapeseed oil',
    amount: ''
  },
  {
    name: '*deodarised cocoa butter',
    amount: ''
  },
  {
    name: '*soy milk (hulled soy beans (7.2%), water)',
    amount: ''
  },
  {
    name: 'liquid soya lecithin',
    amount: ''
  },
  {
    name: 'plant based lactic acid',
    amount: ''
  },
  {
    name: 'sea salt',
    amount: ''
  }
];

export default class DietInformation extends Component {
  render() {
    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Product information"/>
          <HeroPanel image="butter.jpeg" title="Butta" subTitle="A butter alternative" style="image-focus-bottom"/>
          <div className="container">
            <div className="body-copy">
            <p className="body-copy-first important">Please find below all labelling information for our Butta.</p>

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
                <p>Call of the Forest<br />
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
                    <tr>
                        <td>* Organic ingredients</td>
                    </tr>
                    <tr>
                        <td>Free from dairy and gluten</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
          </Row>
          </div>
        </div>
      </div>
    );
  }
}
