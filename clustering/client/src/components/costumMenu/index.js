import React from 'react'
import { Menu, Header } from 'semantic-ui-react'
import { HIERARCHY, K_MEANS } from '../../config/constants'
import '../../App.css'

const CostumMenu = ({ activeItem, handleItemClick }) => {
  return (
    <>
      <Header as="h4" content="Coose clustering algorithm" />
      <Menu fluid widths={2} className="margin">
        <Menu.Item name={K_MEANS} active={activeItem === K_MEANS} onClick={handleItemClick}>
          K-means
        </Menu.Item>
        <Menu.Item name={HIERARCHY} active={activeItem === HIERARCHY} onClick={handleItemClick}>
          Hierarchical
        </Menu.Item>
      </Menu>
    </>
  )
}

export default CostumMenu
