import React, { Component, PropTypes } from 'react';
import {Col, Row} from 'react-bootstrap';
import MultiValueFieldActions from 'components/Form/MultiValueFieldActions';
import MultiValueFieldAddButton from 'components/Form/MultiValueFieldAddButton';

import upperFirst from 'lodash/upperFirst';

export default class MultiValueField extends Component {

  static propTypes = {
    field: PropTypes.any,
    children: PropTypes.node,
    singularName: PropTypes.string,
    pluralName: PropTypes.string,
    toolbarClass: PropTypes.string
  }

  renderChildren(childProps) {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {...childProps, index: index});
    });
  }

  render() {
    const {field, pluralName, singularName, toolbarClass} = this.props;
    return (
      <div>
       {!field.length && <h4>No {upperFirst(pluralName)}</h4>}
        <MultiValueFieldAddButton field={field} title={'Add ' + upperFirst(singularName)}/>
        {field.map((fieldItem, index) =>
          <div key={index} >
            <h5>{upperFirst(singularName)} #{index + 1}</h5>
            <Row>
              <Col xs={12} md={8}>{this.renderChildren(fieldItem)}</Col>
              <Col xs={12} md={4}>
              <div className={toolbarClass}>
                <MultiValueFieldActions field={field} index={index} />
              </div>
            </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}

