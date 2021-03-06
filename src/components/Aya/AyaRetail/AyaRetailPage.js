import React, { Component, PropTypes } from 'react';
import {ResponsiveImage} from 'components';
import { Parallax, Background } from 'react-parallax';

export default class AyaRetailPage extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    style: PropTypes.string
  };

  render() {
    const {children} = this.props;
    const styles = require('./AyaRetailPage.scss');
    const sections = [];
    let section = {
      children: [],
      parallax: false
    };
    const backgrounds = [styles.background1, styles.background2, styles.background3, styles.background4];
    sections.push(section);
    if (Array.isArray(children)) {
      children.map((child) => {
        if (child.type === 'parallax') {
          section.parallax = {
            image: child.props.image,
            children: child.props.children
          };
          section = {
            children: [],
            parallax: false
          };
          sections.push(section);
        }else {
          section.children.push(child);
        }
      });
    }

    return (
      <div className="presentation">
        <div className="container-fluid">
          <div className="row">
           <div className={'col-md-10 col-md-offset-2'}>
              <h1>Aya</h1>
            </div>
          </div>
        </div>
        <div>
          {sections.map((_section, index) =>
            <div>
              <div className={'container-fluid ' + backgrounds[index]}>
                <div className="row">
                  <div className={'col-md-8 col-md-offset-2'}>
                    {_section.children.map((child) => child)}
                  </div>
                </div>
              </div>
              <If condition={_section.parallax}>
                <Parallax strength={400}>
                   <Background>
                    <ResponsiveImage image={_section.parallax.image}/>
                    <div className="parallax-background-overlay" />
                   </Background>
                   {_section.parallax.children}
                </Parallax>
              </If>
            </div>
          )}
        </div>
      </div>
    );
  }
}
