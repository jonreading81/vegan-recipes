import React, { Component, PropTypes } from 'react';
import {ButtaNavigation} from 'components';
import { Parallax } from 'react-parallax';

export default class ButtaPage extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    selected: PropTypes.string.isRequired,
    style: PropTypes.string
  };

  render() {
    const {selected, children} = this.props;
    const styles = require('./ButtaPage.scss');
    const sections = [];

    let section = {
      children: [],
      parallax: false
    };

    sections.push(section);

    children.map((child) => {
      if (child.type === 'hr') {
        section = {
          children: [],
          parallax: {
            image: child.props.image,
            children: child.props.children
          }
        };
        sections.push(section);
      }else {
        section.children.push(child);
      }
    });

    return (
      <div className="presentation">
        <ButtaNavigation selected={selected}/>
        <div className="container-fluid">
          <div className="row">
           <div className={'col-md-10 col-md-offset-2'}>
              <h1 className={styles.logo}>Butta</h1>
            </div>
          </div>
        </div>
        {sections.map((_section) =>
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className={'col-md-8 col-md-offset-2'}>
                  {_section.children.map((child) => child)}
                </div>
              </div>
            </div>
            <If condition={_section.parallax}>
                <Parallax bgImage={_section.parallax.image} strength={400}>{_section.parallax.children} </Parallax>
            </If>
          </div>
        )}
      </div>
    );
  }
}

