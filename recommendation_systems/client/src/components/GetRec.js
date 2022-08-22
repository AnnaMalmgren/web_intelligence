import React, { useState, useEffect } from 'react'
import Notification from './Notification'
import Form from './Form'
import { metric } from '../enums'
import '../App.css'

const GetRec = ({ setRecs, setIsLoading }) => {
  const [formData, setFormData] = useState({})
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    const controller = new window.AbortController()

    const { signal } = controller
    const { type, user } = formData

    const fetchRecs = async () => {
      if (type && user) {
        setIsLoading(true)
        let res = await window.fetch(`/${type}/${formData.metric || metric.EUCLIDEAN}/${user}?result=${formData.result}`, {
          signal: signal
        })

        res = await res.json()
        setShowToast(res.recommendations.length === 0)
        setIsLoading(false)
        setRecs({ rec: res.recommendations, type: type })
      }
    }

    fetchRecs()

    return () => {
      controller.abort()
    }
  }, [formData, setRecs])


  return (
    <React.Fragment>
      <Notification showToast={showToast} setShowToast={setShowToast} />
      <Form onSubmit={setFormData} />
    </React.Fragment>

  )
}

export default GetRec
