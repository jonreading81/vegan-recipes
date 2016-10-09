import React, { Component, PropTypes } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import ViewHelper from 'helpers/Inspiration';
import {AdminUser, Inspiration} from 'components';

export default class RecipeDetail extends Component {

  static propTypes = {
    entity: PropTypes.string.isRequired
  };

  render() {
    const {entity} = this.props;
    const myEntity = new ViewHelper(entity);
    const styles = require('./InspirationDetails.scss');
    return (
      <div className={styles.container}>
        <Inspiration title={myEntity.getTitle()} image={myEntity.getImage()} quote={myEntity.getQuote()} author={myEntity.getQuoteAuthor()} showQuote/>
        <AdminUser>
          <div className="container">
            <ButtonToolbar>
              <LinkContainer to={myEntity.getUpdateURL()}>
                <Button bsStyle="primary" bsSize="large" >Update</Button>
              </LinkContainer>
              <LinkContainer to={myEntity.getDeleteURL()}>
                <Button bsStyle="primary" bsSize="large" >Delete</Button>
              </LinkContainer>
            </ButtonToolbar>
           </div>
        </AdminUser>
      </div>
    );
  }
}

