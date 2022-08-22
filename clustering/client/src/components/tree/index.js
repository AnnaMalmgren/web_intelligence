import React from "react"
import Node from "./nodes"
import "../../App.css"
import { Container } from "semantic-ui-react"

const Tree = ({ data, type }) => {
  return (
    <Container className='nodes'>
      <Node cluster={data} />
    </Container>
  )
}

export default Tree
