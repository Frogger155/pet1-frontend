import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export default function CardListTabular() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios.get(`${API_BASE_URL}/posts/logged-user/`,
      {
        headers: {
          'Authorization': `JWT ${localStorage.getItem("access_token")}`,
        }
      }

    )
      .then(function (response) {
        console.log(response)
        setPosts(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })


  }, [])

  return (

    <table class="mt-5 min-w-full ml-1 mr-1 divide-y divide-gray-200">
      <thead>
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Лайков</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        {
          posts.map(post => (
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">{post["title"]}</td>
              <td class="px-6 py-4 whitespace-nowrap">{post["date_created"]}</td>
              <td class="px-6 py-4 whitespace-nowrap">{post["num_likes"]}</td>
              <td class="px-6 py-4 whitespace-nowrap">           
                <Link class="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" to={`../post/` + post["id"] + "/edit" }>Редактировать</Link>
                <Link class="px-4 py-2 ml-1 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out" to={`../post/` + post["id"] + "/delete" }>Удалить</Link>
                
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
