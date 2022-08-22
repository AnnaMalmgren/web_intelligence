import React, { useState } from 'react'

import KMeansForm from '../../forms/kMeansForm'
import HiearchyForm from '../../forms/hierarchyForm'
import { HIERARCHY, K_MEANS } from '../../config/constants'

const CustomForm = ({ setClusters, algorithm }) => {
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHierarchy = async () => {
    setIsLoading(true)
    let res = await window.fetch(`/${algorithm}`)
    setClusters(await res.json())
    setIsLoading(false)
  }

  const submitKMeans = async (data, e) => {
    setIsLoading(true)
    let res = await window.fetch(`/${algorithm}?clusters=${data.k}&iterations=${data.iterations}`)
    setClusters(await res.json())
    setIsLoading(false)
    e.target.reset()
  }

  return (
    <>
      {algorithm === K_MEANS && <KMeansForm onSubmit={submitKMeans} isLoading={isLoading} />}
      {algorithm === HIERARCHY && (
        <HiearchyForm onSubmit={onSubmitHierarchy} isLoading={isLoading} />
      )}
    </>
  )
}

export default CustomForm
