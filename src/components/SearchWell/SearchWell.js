import React, { Component, PropTypes } from 'react';
import {FormGroup, FormControl, Button, Col, Row} from 'react-bootstrap';
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
    const styles = require('./SearchWell.scss');
    return (
      <div className={styles.searchComponent}>
        <h3>Search</h3>
        <form onSubmit={::this.handleSubmit}>
          <Row>
            <Col xs={8} sm="10">
            <FormGroup controlId="search">
             <FormControl ref="search" type="text" placeholder="Enter Search Term" onChange={::this.handleSearchChange} />
            </FormGroup>
            </Col>
            <Col xs={4} sm="2">
               <Button className="pull-right" bsStyle="primary" bsSize="large" type="submit">Search</Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}
