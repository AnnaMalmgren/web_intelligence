import React, { useState } from 'react'
import { Form, Message, Button, Checkbox } from 'semantic-ui-react'
import { useForm } from 'react-hook-form'
import '../../App.css'

const KMeansForm = ({ onSubmit, isLoading }) => {
  const [kNum, setKNum] = useState(false)
  const [maxItr, setMaxItr] = useState(false)
  const { register, handleSubmit, errors } = useForm()

  return (
    <Form onSubmit={handleSubmit(onSubmit)} error>
      <Form.Group widths="equal">
        <Form.Field>
          <Checkbox
            label="Decide number of clusters"
            className="check-box"
            checked={kNum}
            onChange={() => setKNum(!kNum)}
          />
          <input
            disabled={!kNum}
            name="k"
            type="number"
            placeholder="Enter number of clusters"
            ref={register({ min: 1, max: 1000 })}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            label="Decide max itertaions"
            className="check-box"
            checked={maxItr}
            onChange={() => setMaxItr(!maxItr)}
          />
          <input
            disabled={!maxItr}
            name="iterations"
            type="number"
            placeholder="Enter number of iterations"
            ref={register({ min: 1, max: 1000 })}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <Button
          type="submit"
          compact={true}
          positive={true}
          loading={isLoading}
          className="submit-btn"
        >
          Send
        </Button>
      </Form.Field>
      {errors.k && <Message error content="Clusters must be between 1 and 1000" size="mini" />}
      {errors.iterations && (
        <Message error content="Iterations must be between 1 and 1000" size="mini" />
      )}
    </Form>
  )
}

export default KMeansForm
