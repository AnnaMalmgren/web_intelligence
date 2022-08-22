import React from 'react'
import { Accordion, Icon, List } from 'semantic-ui-react'
import './style.css'

const ClusterAccordion = ({ activeIndex, setActiveIndex, index, node }) => {
  const handleClick = () => {
    let newState =
      activeIndex.indexOf(index) > -1
        ? activeIndex.filter(i => i !== index)
        : [...activeIndex, index]

    setActiveIndex(newState)
  }

  return (
    <>
      <Accordion.Title
        className="accordion_title"
        active={activeIndex.includes(index)}
        index={index}
        onClick={e => handleClick(e)}
      >
        <Icon name="dropdown" size="large" />
        <Icon
          name={activeIndex.includes(index) ? 'folder open outline' : 'folder outline'}
          size="large"
        />
        {node.title}
        {` (${node.assignments.length}) `}
      </Accordion.Title>
      <Accordion.Content active={activeIndex.includes(index)}>
        <List className="accordion_content">
          {node.assignments.map((assignment, i) => {
            return (
              <List.Item key={i} className="accordion_item">
                <Icon name="file outline" />
                <List.Content>{assignment}</List.Content>
              </List.Item>
            )
          })}
        </List>
      </Accordion.Content>
    </>
  )
}

export default ClusterAccordion
