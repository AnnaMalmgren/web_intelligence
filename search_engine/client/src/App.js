import React, { useState } from 'react'
import { Container } from 'semantic-ui-react'
import Search from './components/Search'
import ResultTable from './components/ResultTable'
import './App.css'

const App = () => {
  const [results, setResults] = useState({})

  return (
    <>
      <header className="App-header">
        <p>A3: Search Engine</p>
      </header>
      <Container>
        <Search setResults={setResults} />
        <ResultTable results={results} />
      </Container>
    </>
  )
}

export default App
