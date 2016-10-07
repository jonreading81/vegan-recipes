import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Button, ButtonToolbar, Col} from 'react-bootstrap';
import ViewHelper from 'helpers/Inspiration';
import {AdminUser, ResponsiveImage} from 'components';

export default class RecipeDetail extends Component {

  static propTypes = {
    entity: PropTypes.string.isRequired
  };

  render() {
    const {entity} = this.props;
    const myEntity = new ViewHelper(entity);

    return (
      <Col md={10} mdOffset={1}>
      <div className="fullscreen">
      <ResponsiveImage image={myEntity.getImage()}/>
      </div>
     <p><blockquote>{myEntity.getQuote()}</blockquote></p>
      <AdminUser>
        <ButtonToolbar>
          <LinkContainer to={myEntity.getUpdateURL()}>
            <Button bsStyle="primary" bsSize="large" >Update</Button>
          </LinkContainer>
          <LinkContainer to={myEntity.getDeleteURL()}>
            <Button bsStyle="primary" bsSize="large" >Delete</Button>
          </LinkContainer>
        </ButtonToolbar>
      </AdminUser>
      </Col>
    );
  }
}

