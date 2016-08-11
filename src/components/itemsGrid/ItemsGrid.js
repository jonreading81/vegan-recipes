import React, { Component, PropTypes } from 'react';
import {Col, Thumbnail } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class ItemsGrid extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    return (
      <div>
       {this.props.items.map((item) =>
             <Col xs={6} md={4}>
              <LinkContainer to={item.URL}>
              <Thumbnail src={item.thumbnail}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Thumbnail>
              </LinkContainer>
              <h4>{item.title}</h4>
                <p>{item.description}</p>
            </Col>
          )}
      </div>
    );
  }
}
