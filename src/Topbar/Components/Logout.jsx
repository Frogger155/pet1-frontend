import React from 'react'
import { CurrentUserContext } from '../../CurrentUserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
  const { user, updateUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  const onSubmit = () => {
    console.log("exited")
    localStorage.clear()
    updateUser({
      "username": "anon",
      "user_id": -1,
      "is_anon_user": true
    })
    setTimeout(navigate, 0, "/")
  }
  const onCancel = () => {
    console.log("canceled")
    setTimeout(navigate, 0, "/")
  }
  return (
    <>
      <div class="p-8 mt-10">
        <div class="w-1/2 mx-auto p-4">
          <h1 class="text-2xl text-center font-bold mb-4">Действильно выйти из аккаунта {user.username}?</h1>
          <div class="flex flex-row gap-3">
            <button type="submit" onClick={onSubmit}
              class="flex w-full justify-center rounded-md border-black border-2 py-2 px-4 text-md font-medium text-black shadow-sm hover:bg-opacity-75
                 hover:text-white hover:border-white hover:bg-green-700">Да
            </button>
            <button type="cancel" onClick={onCancel}
              class="flex w-full justify-center rounded-md border-black border-2 py-2 px-4 text-md font-medium text-black shadow-sm hover:bg-opacity-75
                 hover:text-white hover:border-white hover:bg-red-700">Нет
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
