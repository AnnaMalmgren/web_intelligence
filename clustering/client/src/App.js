import React, { useState } from 'react'
import { Container, Header, Divider } from 'semantic-ui-react'
import Tree from './components/tree'
import CustomAccordion from './components/customAccordion'
import CustomForm from './components/costumForm'
import CostumMenu from './components/costumMenu'
import { HIERARCHY, K_MEANS } from './config/constants'
import './App.css'

const App = () => {
  const [clusters, setClusters] = useState([])
  const [algorithm, setAlgorithm] = useState('')

  const setActiveAlgorithm = (e, { name }) => {
    setClusters([])
    setAlgorithm(name)
  }

  return (
    <>
      <Container className="App">
        <Header as="h2" textAlign="center" content="Clustering" className="App-header" />
        <Divider section />
        <CostumMenu activeItem={algorithm} handleItemClick={setActiveAlgorithm} />
        <CustomForm setClusters={setClusters} algorithm={algorithm} />
        {algorithm === HIERARCHY && clusters.value && <Tree data={clusters} />}
        {algorithm === K_MEANS && <CustomAccordion data={clusters} />}
      </Container>
    </>
  )
}

export default App
