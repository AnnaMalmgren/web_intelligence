import React, { useState } from "react"
import { List } from "semantic-ui-react"
import "./styles.css"

const Node = ({ cluster }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <List>
      <List.Item>
        <List.Icon
          name={isOpen ? "caret down" : "caret right"}
          link
          onClick={() => toggle()}
          size='large'
        />
        <List.Icon name={isOpen ? "folder open outline" : "folder outline"} size='large' />
        <List.Content>
          <List.List className={isOpen ? "show" : "hide"}>
            {cluster.value &&
              cluster.value.map((c, i) => {
                return c.leaf ? (
                  <List.Item key={i} className='leaf'>
                    <List.Icon name='file outline' />
                    <List.Content>{c.value}</List.Content>
                  </List.Item>
                ) : (
                  <Node key={i} cluster={c} />
                )
              })}
          </List.List>
        </List.Content>
      </List.Item>
    </List>
  )
}

export default Node
