import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../axios.config'

export default function Registration() {
  const [isRegSuccessful, setIsRegSuccessful] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = data => {
    axiosInstance
      .post('user-managment/create/', {
        username: data["username"],
        password1: data["password1"],
        password2: data["password2"]
      })
      .then(function (response) {
        setIsRegSuccessful(true)
        setTimeout(navigate, 3000, "/")

      })
      .catch(function (error) {
        const errors_object = error["response"]["data"]
        for (const [key, value] of Object.entries(errors_object)) {
          console.log(key, value[0])
          setError(key, {
            type: 'field_error',
            'message': value[0]
          })
        }
      });
  }

  return (
    <div class="flex h-screen items-center justify-center p-4">
      <div class="w-full max-w-sm">
        {!isRegSuccessful && (
          <div class="p-8">
            <h2 class="mt-6 text-center text-xl font-bold text-black">
              РЕГИСТРАЦИЯ
            </h2>
            <form class="space-y-6 mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label for="username" class="block text-sm font-medium text-black">Логин</label>
                <div class="mt-1">
                  <input name="username" type="text" required
                    class="px-2 py-3 mt-1 block w-full rounded-md border-2 border-black shadow-sm sm:text-sm"
                    {...register("username")} />
                  {errors.username && <p class="text-red-500">{errors.username.message}</p>}
                </div>
              </div>

              <div>
                <label for="password1" class="block text-sm font-medium text-black">Пароль</label>
                <div class="mt-1">
                  <input id="password1" name="password1" type="password" autocomplete="password" required
                    class="px-2 py-3 mt-1 block w-full rounded-md border-2 border-black shadow-sm sm:text-sm"
                    {...register("password1")} />
                  {errors.password1 && <p class="text-red-500">{errors.password1.message}</p>}
                </div>
              </div>
              <div>
                <label for="password2" class="block text-sm font-medium text-black">Пароль (еще раз)</label>
                <div class="mt-1">
                  <input id="password2" name="password2" type="password" autocomplete="password" required
                    class="px-2 py-3 mt-1 block w-full rounded-md border-2 border-black shadow-sm sm:text-sm"
                    {...register("password2")} />
                  {errors.password2 && <p class="text-red-500">{errors.password2.message}</p>}
                </div>
              </div>
              {errors.non_field_errors && <p class="text-red-500">{errors.non_field_errors.message}</p>}

              <div>
                <button type="submit"
                  class="flex w-full justify-center rounded-md border-black border-2 py-2 px-4 text-md font-medium text-black shadow-sm hover:bg-opacity-75
                 hover:text-white hover:border-white hover:bg-black">Зарегистрироваться

                </button>
              </div>
            </form>

          </div>
        )}
        {isRegSuccessful && (
          <div>
            <p class="text-center text-green-600">
              Регистрация успешна!
            </p>
            <p class="text-center">
              Перенаправляем Вас на страницу логина.
            </p>
           </div>

        )}

      </div>

    </div>

  )
}
