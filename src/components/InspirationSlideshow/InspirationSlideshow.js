import React, { Component, PropTypes } from 'react';
import { Inspiration, IconButton} from 'components';
import ViewHelper from 'helpers/Inspiration';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import get from 'lodash/get';


export default class InspirationSlideshow extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired
  };

  constructor(...args) {
    super(...args);
    this.state = {
      itemIndex: 0,
      showQuote: true
    };
    this.bound_keyDown = ::this.keydown;
  }

  componentDidMount() {
    console.log(this);
    console.log('addEventListener');
    window.addEventListener('keydown', this.bound_keyDown, false);
  }

  componentWillUnmount() {
    console.log('removeEventListener');
    window.removeEventListener('keydown', this.bound_keyDown, false);
  }

  keydown(event) {
    const key = get(event, 'key');
    if (key === 'ArrowRight') this.showNext();
    if (key === 'ArrowLeft') this.showPrevious();
  }

  showNext() {
    let index = this.state.itemIndex + 1;
    if (index === this.props.items.length) {
      index = 0;
    }
    this.setState({ itemIndex: index});
  }

  showPrevious() {
    let index = this.state.itemIndex - 1;
    if (index < 0) {
      index = this.props.items.length - 1;
    }
    this.setState({ itemIndex: index});
  }

  toggleQuote(showQuote) {
    this.setState({ showQuote: showQuote});
  }

  render() {
    const {items} = this.props;
    const myHelper = new ViewHelper(items[this.state.itemIndex]);
    const styles = require('./InspirationSlideshow.scss');

    return (
      <div className={styles.container}>
        <BreadcrumbContainer>
        <LinkContainer to="/Inspiration/list/all">
          <Breadcrumb.Item>Inspiration</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Slideshow</Breadcrumb.Item>
        </BreadcrumbContainer>
      <div className={styles.navigationWrapper}>
        <div className={styles.navigation}>
          <div className={styles.iconWrapper}>
            <IconButton onClick={::this.showPrevious} type="arrow-left" style={styles.previous}/>
            <IconButton onClick={::this.showNext} type="arrow-right" style={styles.next}/>
          </div>
        </div>
      </div>
       <ReactCSSTransitionReplace transitionName="cross-fade" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
        <div key={this.state.itemIndex} >
          <Inspiration toggleQuote={::this.toggleQuote} title={myHelper.getTitle()} image={myHelper.getImage()} quote={myHelper.getQuote()} author={myHelper.getQuoteAuthor()} showQuote={this.state.showQuote} color={myHelper.getColor()}/>
        </div>
      </ReactCSSTransitionReplace>
      </div>
    );
  }
}

