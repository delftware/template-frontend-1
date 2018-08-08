import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'
import TableHeader from './TableHeader';
import LoadingSpinner from './LoadingSpinner';
import styled from 'styled-components'

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`

export default class CustomTable extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

    render() {
        const { isLoading, headings, rows} = this.props;
        if (isLoading !== undefined && isLoading) {
          return <LoadingSpinner loading={isLoading} />
        } else {
          return (
            <Container>
              {!isLoading && <Table {...this.props}>
                {headings && <TableHeader headings={headings} />}
                  <Table.Body>
                    {rows}
                  </Table.Body>
              </Table>}
            </Container>
          );  
        }
    }
}
