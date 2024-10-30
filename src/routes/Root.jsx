import Topbar from "../Topbar/Components/Topbar"
import MainContent from "../MainContent/Components/MainContent"
import Footer from "../Footer/Components/Footer"
import { Outlet } from "react-router-dom"
import { CurrentUserContext } from "../CurrentUserContext"
import { useState, useEffect } from "react"

export default function Root() {
  const [user, setUser] = useState("")
  const access_token = localStorage.getItem('access_token')
  useEffect(() => {
    if (access_token) {
      const tokenParts = JSON.parse(atob(access_token.split('.')[1]))
      setUser({
        "user_id": tokenParts.user_id,
        "username": tokenParts.username,
        "is_anon_user": false
      })
    }
  }, [])

  const updateUser = (user) => setUser(user)

  return (
    <>
      <CurrentUserContext.Provider value={{ user, updateUser }}>
        <Topbar />
        <MainContent />
        <Outlet />
      </ CurrentUserContext.Provider>
    </>
  )
}
