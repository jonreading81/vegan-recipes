import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {HeroPanel} from 'components';
import {Row, ButtonToolbar, Button} from 'react-bootstrap';
import UserHelper from 'helpers/User';
import { LinkContainer } from 'react-router-bootstrap';

@connect(
  (state) => {
    return {
      user: state.auth.user,
    };
  }
)
export default class Welcome extends Component {
  static propTypes = {
    user: PropTypes.object
  }


  render() {
    const {user} = this.props;
    const myUserHelper = new UserHelper(user);
    // const styles = require('./Welcome.scss');
    return (
      <div>
        <Helmet title="Welcome"/>
        <HeroPanel isEmpty image="forest.jpeg" />
        <div className={'container'}>
          <Row>
            <div className="body-copy">
              <h2>Welome to our community</h2>
              <p className="important">Thank you for being party of this community {myUserHelper.getFirstName()}.</p>
              <blockquote>
              The idea is not that because there are a million people doing the same thing as you, you feel secure because you’re not the odd man out. The idea is more that you are the odd man out in any case, and there are lots of odd men out together.
             </blockquote>
              <cite><a href="https://www.amazon.co.uk/Path-Goal-Handbook-Buddhist-Meditation/dp/1590309103">Chögyam Trungpa Rinpoche, The Path Is The Goal</a></cite>
              <h3>What would you like to do?</h3>
               <ButtonToolbar>
                <LinkContainer to="/recipe/list/all">
                  <Button bsSize="large" >View our Recipes</Button>
                </LinkContainer>
                 <LinkContainer to="recipe/add">
                  <Button bsSize="large" >Add a Recipe</Button>
                  </LinkContainer>
                </ButtonToolbar>
            </div>
          </Row>
        </div>
      </div>
    );
  }
}
