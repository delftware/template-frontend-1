import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

export default class TableHeader extends Component {
      
  render() {
    const { headings } = this.props;
    return (
      <Table.Header>
        <Table.Row>
          {headings.map((h, i) => 
            <Table.HeaderCell key={i}>{h}</Table.HeaderCell> 
          )}
        </Table.Row>
      </Table.Header>
    )
  }
}
