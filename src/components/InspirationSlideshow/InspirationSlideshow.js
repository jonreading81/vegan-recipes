import React, { Component, PropTypes } from 'react';
import { Inspiration, IconButton} from 'components';
import ViewHelper from 'helpers/Inspiration';
import ReactCSSTransitionReplace from 'react-css-transition-replace';
import {BreadcrumbContainer} from 'components';
import {Breadcrumb} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import get from 'lodash/get';
// import isundefined from 'lodash/isUndefined';
import { browserHistory } from 'react-router';


export default class InspirationSlideshow extends Component {

  static propTypes = {
    item: PropTypes.object,
    next: PropTypes.object,
    prev: PropTypes.object,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      showQuote: true
    };
    this.bound_keyDown = ::this.keydown;
  }

  componentDidMount() {
    window.addEventListener('keydown', this.bound_keyDown, false);
  }

  shouldComponentUpdate(nextProps) {
    const NEXT_ITEM = new ViewHelper(nextProps.item);
    const CURRENT_ITEM = new ViewHelper(this.props.item);

    if (get(nextProps, 'item') &&
      NEXT_ITEM.getTitle() !== CURRENT_ITEM.getTitle() ) {
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.bound_keyDown, false);
  }
  keydown(event) {
    const key = get(event, 'key');
    if (key === 'ArrowRight') this.showNext();
    if (key === 'ArrowLeft') this.showPrevious();
  }

  showNext() {
    const { next} = this.props;
    if (next) {
      const nextItem = new ViewHelper(next);
      browserHistory.push(nextItem.getURL());
    }
  }

  showPrevious() {
    const { prev} = this.props;
    if (prev) {
      const prevItem = new ViewHelper(prev);
      browserHistory.push(prevItem.getURL());
    }
  }

  toggleQuote(showQuote) {
    this.setState({ showQuote: showQuote});
  }

  render() {
    const {item, next, prev} = this.props;
    const slideshowItem = new ViewHelper(item);
    const nextItem = new ViewHelper(next);
    const prevItem = new ViewHelper(prev);
    const styles = require('./InspirationSlideshow.scss');

    return (
      <div className={styles.container}>
        <BreadcrumbContainer>
        <LinkContainer to="/Inspiration/list/all">
          <Breadcrumb.Item>Inspiration</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>{slideshowItem.getTitle()}</Breadcrumb.Item>
        </BreadcrumbContainer>
      <div className={styles.navigationWrapper}>
        <div className={styles.navigation}>
          <div className={styles.iconWrapper}>
          <If condition={prev}>
            <LinkContainer to={prevItem.getURL()}>
            <IconButton type="arrow-left" styles={{iconWrapper: styles.previous}}/>
            </LinkContainer>
          </If>
          <If condition={next}>
            <LinkContainer to={nextItem.getURL()}>
            <IconButton type="arrow-right" styles={{iconWrapper: styles.next}}/>
            </LinkContainer>
          </If>
          </div>
        </div>
      </div>
       <ReactCSSTransitionReplace transitionName="cross-fade" transitionEnterTimeout={1000} transitionLeaveTimeout={1000}>
        <div key={slideshowItem.getSlug()} >
          <Inspiration toggleQuote={::this.toggleQuote} title={slideshowItem.getTitle()} image={slideshowItem.getImage()} quote={slideshowItem.getQuote()} author={slideshowItem.getQuoteAuthor()} showQuote={this.state.showQuote} color={slideshowItem.getColor()}/>
        </div>
      </ReactCSSTransitionReplace>
      </div>
    );
  }
}

