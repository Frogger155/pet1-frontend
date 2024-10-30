import { useState, useContext } from 'react'
import React, { lazy } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { CurrentUserContext } from '../../CurrentUserContext'
import axios from 'axios'


let tag_id = 0

export default function AddPost() {
    const { user, updateUser } = useContext(CurrentUserContext)
    const [tagsList, setTagsList] = useState([])
    const [currentTag, setCurrentTag] = useState({
        id: 0,
        name: ""
    })
    const [infoText, setInfoText] = useState("")
    const [tagsListError, setTagsListError] = useState("")
    const schema = yup.object({
        title: yup
            .string()
            .required("Обязательное поле")
            .min(2, "Минимальная длина названия: ${min} символа")
            .max(200, "Максимальная длина названия: ${max} символов")
            .trim(),
        media: yup
            .mixed()
            .test(
                "required",
                "Картинка или видео обязательны",
                files => files?.length > 0
            ),
    })
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    const handleTagChange = (event) => {
        setCurrentTag({
            id: 0,
            name: event.target.value
        })
    }

    const handleEnterPressed = (event) => {
        if (event.key === "Enter") {
            setTagsListError("")
            event.preventDefault()
            if (currentTag.name.length > 1 && currentTag.name.length < 50) {
                setTagsList([...tagsList, {
                    id: tag_id++,
                    name: currentTag.name
                }])
                setCurrentTag({
                    id: 0,
                    name: ""
                })
            } else {
                console.log("error!")
                setTagsListError("Длина тэга: от 2 до 50 символов")
            }

        } else {
            return
        }
    }

    const handleTagDelete = (t) => {
        setTagsList(tagsList.filter(tag => tag.id !== t.id))
    }
    const onSubmit = (data, event) => {
        const form = new FormData()
        form.append('title', data.title)
        form.append('content', data.media[0])
        tagsList.map(tag_obj => {
            form.append('tags', tag_obj.name)
        })
        const { response } = axios.post('http://localhost:8000/posts/add/',
            form,
            {
                headers: {
                    'Authorization': `JWT ${localStorage.getItem("access_token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(
                response => {
                    console.log(response)
                    if (response.status < 400) {
                        setInfoText("Пост создан. Перенаправляем вас на другую страницу")
                    }
                }
            )
            .catch(
                error => {
                    setInfoText(error.message)
                }
            )

    }


    return (
        <>
            <div class="flex flex-col items-center justify-center mt-5">
                <div class="w-1/2 border rounded-md shadow-slate-700 shadow-sm">
                    <h4 class="text-center m-1 text-black font-bold text-xl uppercase">Добавление нового поста</h4>
                    <div class="p-10 rounded-lg">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="mb-2">
                                <label for="title" class="block mb-2 font-semibold text-slate-900">Название</label>
                                <input
                                    {...register("title")}
                                    type="text" id="title" name="title" class="border-2 border-slate-300 shadow p-3 w-full
                                 rounded focus:border-2 focus:border-slate-950 focus:outline-none" />
                                <span
                                    class="text-sm text-slate-500"
                                >
                                    Минимум 2 символа, максимум 200
                                </span>
                                <p class="text-sm text-red-500">{errors.title?.message}</p>
                            </div>
                            <div class="mb-2">
                                <label for="file" class="mb-1 font-semibold text-slate-900">Картинка, гифка или видео</label>
                                <input
                                    {...register("media")}
                                    id="file"
                                    type="file"
                                    class="mt-2
                                     block w-full text-sm file:mr-4 file:rounded-md
                                 file:border-2 file:border-slate-950 file:bg-white file:py-2 file:px-4 file:text-sm
                                 file:font-semibold file:text-black hover:file:bg-slate-900
                                 focus:outline-none
                                 hover:file:text-white
                                 disabled:pointer-events-none disabled:opacity-60">
                                </input>
                                <span
                                    class="text-sm flex flex-col text-slate-500"
                                >
                                    <p>Картинки: jpg, jpeg, png, gif</p>
                                    <p>Видео: mp4, webm</p>
                                </span>
                                <p class="text-sm text-red-500">{errors.media?.message}</p>
                            </div>

                            <div class="mb-2">
                                <label for="tag" class="block mb-2 font-semibold text-slate-900">Тэги</label>
                                <input
                                    id="tags_input"
                                    placeholder='Напишите название тэга и нажмите Enter'
                                    value={currentTag.name}
                                    onChange={handleTagChange}
                                    onKeyDown={handleEnterPressed}
                                    disabled={tagsList.length === 10}
                                    type="text" name="title" class="border-2 border-slate-300 shadow p-3 w-full
                                 rounded focus:border-2 focus:border-slate-950 focus:outline-none" />
                                <span
                                    class={tagsList.length === 10 ? "text-md text-red-600" : "text-sm text-slate-500"}
                                >
                                    Минимум 1 тэг, максимум 10 тэгов
                                </span>
                                <p class="text-sm text-red-500">{tagsListError}</p>
                                <div class="flex flex-row gap-1 flex-wrap">
                                    {tagsList.map(tag => (
                                        <span key={tag.id}
                                            class="p-1 flex flex-row rounded-md border-1 bg-slate-900 text-md text-white">
                                            {tag.name}
                                            <svg
                                                onClick={(event) => handleTagDelete(tag)}
                                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4s hover:cursor-pointer">
                                                <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <button
                                disabled={tagsList.length === 0}
                                class="disabled:bg-slate-500 block w-full mt-5 bg-slate-900 text-white font-bold p-4 rounded-lg">Готово</button>
                        </form>
                    </div>
                </div >
                <div class="m-3 text-yellow-600">
                    {infoText}
                </div>
            </div>
        </>
    )
}
