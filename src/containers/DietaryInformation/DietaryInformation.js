import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';
import {Table, Row, Col} from 'react-bootstrap';
import get from 'lodash/get';

const nutritionalData = [
  {
    name: 'Protein',
    amount: '10%',
  },
  {
    name: 'Protein',
    amount: '10%',
  },
  {
    name: 'Protein',
    amount: '10%',
  }
];

const ingredientsData = [
  {
    name: 'Cocoa butter',
    amount: '200g',
  },
  {
    name: 'Cocoa butter',
    amount: '200g',
  },
  {
    name: 'Cocoa butter',
    amount: '200g',
  }
];

export default class DietInformation extends Component {
  render() {
    // const styles = require('./Home.scss');
    return (
      <div>
        <Helmet title="Dietary Information"/>
          <HeroPanel image="butter.jpeg" title="Vegan Butter" subTitle="Dietary Information"style="image-focus-bottom"/>
          <div className="container">
            <div className="body-copy">
            <p className="body-copy-first important">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

              <Row>
                <Col xs={12} sm={6}>
                 <h3>Nutrition</h3>
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
                </Table>
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
                        <td>{get(item, 'amount')}</td>
                      </tr>
                    )}
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
