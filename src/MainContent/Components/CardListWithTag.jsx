import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export async function loader({ params }) {
    return params.tag_name
}


export default function CardListWithGivenTag() {
    const [posts, setPosts] = useState([])
    const tag_name = useLoaderData()

    useEffect(() => {
        axios.get(`${API_BASE_URL}posts/with-tag/` + tag_name + '/')
            .then(function (response) {
                console.log(response)
                setPosts(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })


    }, [tag_name])

    return (
        <>
            {
                posts.map((post) => (
                    <>
                        <Card
                            post_id={post["id"]}
                            title={post["title"]}
                            contentType={post["content_type"]}
                            author={post["author_name"]}
                            author_id={post["author_id"]}
                            contentURL={post["content"]}
                            tagsArray={post["tags"]}
                            dateUploaded={post["date_created"]}
                        />
                        <hr class="h-px my-8 max-w-3xl ml-auto mr-auto bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    </>
                ))
            }
        </>
    )
}