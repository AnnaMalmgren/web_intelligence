import React from 'react'
import { Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import TableRow from './TableRow'

const ResultTable = ({ results }) => (
  <>
    {results.result && (
      <Table celled padded>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Link</Table.HeaderCell>
            <Table.HeaderCell>Score</Table.HeaderCell>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Location</Table.HeaderCell>
            <Table.HeaderCell>Page Rank</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {results.result &&
            results.result.map((obj, index) => (
              <TableRow data={obj} key={index} />
            ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              Found: {results.number} results in {results.time} seconds{' '}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )}
  </>
)

ResultTable.propTypes = {
  results: PropTypes.object,
}
export default ResultTable
