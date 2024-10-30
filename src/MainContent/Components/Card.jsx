import React from 'react'
import { CurrentUserContext } from '../../CurrentUserContext'
import { useContext } from 'react'
import { Link } from "react-router-dom"

function ContentBox({
    contentType,
    contentURL
}) {
    switch (contentType) {
        case 'picture':
            return (
                <img src={contentURL} alt="Post content" style={{ width: '100%', maxHeight: '300px' }} />
            )
        case 'video':
            return (
                <video controls src={contentURL} style={{ width: '100%', maxHeight: '300px' }} />
            )
        default:
            return (
                <p>Unsupported type of content</p>
            )
    }
}

export default function Card({
    post_id,
    title,
    contentType,
    contentURL,
    author,
    dateUploaded,
    tagsArray,
}) {
    const { user, updateUser } = useContext(CurrentUserContext)
    const date = new Date(dateUploaded)
    let readable_date = new Intl.DateTimeFormat("ru-ru").format(date)
    return (
        <div class="flex flex-col border-2 border-gray-500 rounded p-5 mt-8 mb-8 shadow-lg max-w-2xl mx-auto">
            <div class="flex flex-row m-2">
                <h1 class="text-2xl font-semibold mb-2">{title}</h1>
            </div>

            <ContentBox
                contentType={contentType}
                contentURL={contentURL}
            />
            <div class="flex flex-row space justify-between mt-1">
                <div>Добавил: {author}</div>
                <div>{readable_date}</div>
            </div>
            <hr class="mt-2 mb-1 "></hr>
            <div class="flex flex-wrap gap-1 overflow-x-auto mt-3">                {
                tagsArray.map(t =>
                    <div>
                        <div class="bg-slate-900 text-white p-1 rounded-md">
                            <Link to={`/posts/tag/` + t.name}>{t.name}</Link>  |
                            <span class="ml-1 mr-1 font-semibold">
                                {t.posts_count}

                            </span>

                        </div>
                    </div>
                )
            }

            </div>
        </div>
    )
}
