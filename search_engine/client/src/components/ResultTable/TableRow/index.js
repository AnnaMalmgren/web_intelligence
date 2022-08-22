import React from 'react'
import { Table } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const TableRow = ({ data }) => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <>
      <Table.Row>
        <Table.Cell>
          <a href={data.page}>{data.page.slice(27)}</a>
        </Table.Cell>
        <Table.Cell>{formatter.format(data.scores.score)}</Table.Cell>
        <Table.Cell>{formatter.format(data.scores.content)}</Table.Cell>
        <Table.Cell>{formatter.format(data.scores.location)}</Table.Cell>
        <Table.Cell>{formatter.format(data.scores.pageRank)}</Table.Cell>
      </Table.Row>
    </>
  )
}

TableRow.propTypes = {
  data: PropTypes.object,
}
export default TableRow
