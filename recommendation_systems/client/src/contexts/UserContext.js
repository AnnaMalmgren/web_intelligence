import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const controller = new window.AbortController()
    const { signal } = controller
    const fetchUsers = async () => {
      let res = await window.fetch('/users', {
        signal: signal
      })
      res = await res.json()
      setUsers(res)
    }

    fetchUsers()

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <UserContext.Provider value={users}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
