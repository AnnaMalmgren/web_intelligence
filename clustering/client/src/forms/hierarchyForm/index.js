import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import '../../App.css'

const HiearchyForm = ({ onSubmit, isLoading }) => {
  return (
    <Form>
      <Form.Field>
        <label className="btn-label">Hierarchical Clustering</label>
        <Button
          onClick={() => onSubmit()}
          compact={true}
          positive={true}
          loading={isLoading}
          className="submit-btn"
        >
          Calculate clusters
        </Button>
      </Form.Field>
    </Form>
  )
}

export default HiearchyForm
