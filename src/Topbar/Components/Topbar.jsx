import React from 'react'
import { Link } from "react-router-dom"
import { useContext } from 'react'
import { CurrentUserContext } from '../../CurrentUserContext'

export default function Topbar() {
  const { user, updateUser } = useContext(CurrentUserContext)

  return (

    <div class="flex flex-row gap-2 p-5">

      <div class="bg-transparent text-center text-black p-1 rounded-sm font-bold
       hover:bg-slate-800 hover:text-slate-100">
        <Link to={`posts/new/`}>Новое</Link>
      </div>
      <div class="bg-transparent text-center text-black p-1 rounded-sm font-bold
       hover:bg-slate-800 hover:text-slate-100">
        <Link to={`posts/most-liked/`}>Популярное</Link>
      </div>
      {!user.is_anon_user &&
        <div class="flex flex-row">
          <div class="bg-transparent text-center text-black p-1 rounded-sm font-bold
       hover:bg-slate-800 hover:text-slate-100">
            <Link to={`posts/mine/`}>Мои посты</Link>
          </div>
          <div class="bg-transparent text-center text-black p-1 rounded-sm font-bold
       hover:bg-slate-800 hover:text-slate-100">
            <Link to={`new-post/`}>Добавить пост</Link>
          </div>
        </div>

      }


      <div class="flex flex-row ml-auto">
        {user.is_anon_user &&
          <>
            <div class="bg-transparent text-center text-black p-1 rounded-sm font-bold
       hover:bg-slate-800 hover:text-slate-100">
              <Link to={`signup`}>Регистрация</Link>
            </div>
            <div class="bg-transparent text-center text-black p-1 rounded-sm font-bold
       hover:bg-slate-800 hover:text-slate-100">
              <Link to={`login`}>Логин</Link>
            </div>
          </>
        }
        {!user.is_anon_user &&
          <div class="p-1 text-pretty text-indigo-800">
            {user.username}
          </div>
        }
        {!user.is_anon_user &&
          <div class="bg-transparent text-center text-black p-1 rounded-sm font-bold
       hover:bg-slate-800 hover:text-slate-100">
            <Link to={`logout`}>Выйти</Link>
          </div>
        }

      </div>
    </div >

  )
}
