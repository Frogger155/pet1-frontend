import React from 'react'
import axios from 'axios'
import { useLoaderData } from 'react-router-dom'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function DeletePost() {
    const post = useLoaderData()
    const onConfirmPressed = () => {
        const headers = {
            'Authorization': `JWT ${localStorage.getItem("access_token")}`

        };
        response = axios.delete(`${API_BASE_URL}/posts/` + post["id"] + "/delete/", { headers })
            .then(
                console.log("Deleted")
            )
            .catch(
                error => {
                    console.log(error)
                }
            )

    }
    return (
        <div class="border rounded-lg shadow relative max-w-sm m-auto">
            <div class="p-6 pt-0 text-center">
                <h3 class="text-xl font-normal text-gray-500 mt-5 mb-6">Удалить этот пост?</h3>
                <button
                    onClick={onConfirmPressed}
                    class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2 w-24">
                        Да
                </button>
                <a href="javascript:history.back()"
                    class="m-auto text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border border-gray-200 font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center w-24">
                    Нет
                </a>
            </div>
        </div>
    )
}
