/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
import './style.css'

const Search = ({ setResults }) => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    setLoading(true)
    let res = await fetch(`/search/?search=${search}`)
    res = await res.json()
    setLoading(false)
    setResults(res)
  }

  return (
    <>
      <Form loading={loading}>
        <Form.Group>
          <Form.Input
            icon="search"
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button type="button" onClick={onSubmit}>
            Submit
          </button>
        </Form.Group>
      </Form>
    </>
  )
}

Search.propTypes = {
  setResults: PropTypes.func,
}

export default Search
