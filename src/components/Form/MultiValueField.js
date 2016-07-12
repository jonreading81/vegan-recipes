import React, { Component, PropTypes } from 'react';
import {FormControl, ControlLabel, Col, Row} from 'react-bootstrap';
import HelpBlock from 'components/Form/HelpBlock';
import MultiValueFieldActions from 'components/Form/MultiValueFieldActions';
import FormGroup from 'components/Form/FormGroup';
import MultiValueFieldAddButton from 'components/Form/MultiValueFieldAddButton';

import upperFirst from 'lodash/upperFirst';

export default class MultiValueField extends Component {

  static propTypes = {
    field: PropTypes.object,
    pluralName: PropTypes.string,
    singularName: PropTypes.string,
    toolbarClass: PropTypes.string
  }

  render() {
    const {field, pluralName, singularName, toolbarClass} = this.props;
    console.log(field);
    return (
      <div>
       {!field.length && <div>No {pluralName}</div>}
        <MultiValueFieldAddButton field={field} title={'Add ' + upperFirst(pluralName)}/>
        {field.map((fieldItem, index) =>
          <div key={index} >
            <Row>
            <Col xs={12} md={8}>
            <FormGroup controlId={singularName + '-' + (index + 1)} type="text" field={fieldItem}>
              <ControlLabel>{upperFirst(singularName)} #{index + 1}</ControlLabel>
              <FormControl type="input" placeholder={'Enter ' + upperFirst(singularName)} {...fieldItem}/>
              <FormControl.Feedback />
              <HelpBlock field={fieldItem}/>
            </FormGroup>
            </Col>
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

