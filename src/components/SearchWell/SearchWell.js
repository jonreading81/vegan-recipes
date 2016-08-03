import React, { Component, PropTypes } from 'react';
import {FormGroup, FormControl, Button, Well, Col, Row} from 'react-bootstrap';
import get from 'lodash/get';

export default class SearchWell extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  handleSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    const term = get(this.state, 'searchTerm', 'all');
    this.props.onSubmit(term);
  }

  render() {
    return (
      <Well >
        <h3>Search</h3>
        <form onSubmit={::this.handleSubmit}>
          <Row>
            <Col sm={10}>
            <FormGroup controlId="search">
             <FormControl ref="search" type="text" placeholder="Search" onChange={::this.handleSearchChange} />
            </FormGroup>
            </Col>
            <Col sm={2}>
               <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </form>
      </Well>
    );
  }
}
