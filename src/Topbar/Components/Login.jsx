import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CurrentUserContext } from '../../CurrentUserContext'


export default function Login() {
  const { currentUser, updateUser } = useContext(CurrentUserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const navigate = useNavigate()

  const [isLoginSuccesful, setIsLoginSuccesful] = useState(false)
  const [backendError, setBackendError] = useState("")

  const onSubmit = data => {
    axios.post('http://localhost:8000/user-managment/token/', {
      username: data["username"],
      password: data["password"],
    })
      .then(function (response) {
        if (response.status < 300) {
          setBackendError("")
          console.log(response)
          setIsLoginSuccesful(true)
          localStorage.setItem('access_token', response["data"]["access"])
          localStorage.setItem('refresh_token', response["data"]["refresh"])
          const accessToken = response["data"]["access"]
          const accessTokenParts = JSON.parse(atob(accessToken.split('.')[1]))
          updateUser({
            "user_id": accessTokenParts.user_id,
            "username": data["username"],
            "is_anon_user": false
          })
          setTimeout(navigate, 500, "/")
        } else {
          setBackendError("Неверный логин или пароль")
        }
      })
      .catch(function (error) {
        setBackendError("Неверный логин или пароль")
      })
  }

  return (
    <>
      <div class="flex h-screen items-center justify-center p-4">
        <div class="w-full max-w-sm">
          <div class="p-8">
            <h2 class="mt-6 text-center text-xl font-bold text-black">
              ЛОГИН
            </h2>
            {isLoginSuccesful && <div>
              <p class="text-green-700">
                Вход успешен
              </p>
            </div>}
            <form class="space-y-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label for="username" class="block text-sm font-medium text-black">Логин</label>
                <div class="mt-1">
                  <input name="username" type="text" required
                    class="px-2 py-3 mt-1 block w-full rounded-md border-2 border-black shadow-sm sm:text-sm"
                    {...register("username")} />
                </div>
              </div>
              <div>
                <label for="password" class="block text-sm font-medium text-black">Пароль</label>
                <div class="mt-1">
                  <input id="password" name="password" type="password" autocomplete="password" required
                    class="px-2 py-3 mt-1 block w-full rounded-md border-2 border-black shadow-sm sm:text-sm"
                    {...register("password")} />
                </div>
              </div>
              <div>
                <button type="submit"
                  class="flex w-full justify-center rounded-md border-black border-2 py-2 px-4 text-md font-medium text-black shadow-sm hover:bg-opacity-75
                 hover:text-white hover:border-white hover:bg-black">Войти
                </button>
              </div>
              {backendError && <p class="text-rose-600">{backendError}</p>}
            </form>

          </div>
        </div>
      </div>
    </>

  )
}
