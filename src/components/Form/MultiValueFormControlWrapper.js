import React, { Component, PropTypes } from 'react';
import FormGroup from 'components/Form/FormGroup';

export default class MultiValueFormControlWrapper extends Component {

  static propTypes = {
    id: PropTypes.string,
    index: PropTypes.number,
    children: PropTypes.node,
  }

  renderChildren(childProps) {
    return React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {...childProps, index: index});
    });
  }

  render() {
    console.log(this.props);
    const { id, index} = this.props;
    return (
        <FormGroup id={id + '-' + index} field={this.props}>
          {this.renderChildren(this.props)}
        </FormGroup>
    );
  }
}

