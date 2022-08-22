import React, { useState } from "react"
import { Accordion } from "semantic-ui-react"
import ClusterAccordion from "./clusterAccordion"

const CustomAccordion = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState([])

  return (
    <>
      <Accordion fluid styled>
        {data &&
          data.map((cluster, i) => {
            return (
              <ClusterAccordion
                key={i}
                index={i + 1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
                node={cluster}
              />
            )
          })}
      </Accordion>
    </>
  )
}

export default CustomAccordion
