import React, {Component} from 'react';
import { sortable } from 'react-sortable';
import { ListGroupItem } from 'react-bootstrap';
import HtmlToReact from 'html-to-react';
const htmlToReactParser = new HtmlToReact.Parser(React);

class ListItem extends Component {

  render() {
    const contentComponent = htmlToReactParser.parse(`<div>${this.props.children}</div>`);
    return (
      <ListGroupItem {...this.props}>{contentComponent}</ListGroupItem>
    );
  }
}

export default sortable(ListItem);
