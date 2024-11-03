import React, { useState, useEffect } from "react";
import Card from "./Card";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export async function loader({ params }) {
    console.log(params)
    return params.option
}


export default function CardList() {
    const [posts, setPosts] = useState([])
    const option = useLoaderData()

    useEffect(() => {
        console.log(option)
        axios.get(`${API_BASE_URL}posts/` + option + "/")
            .then(function (response) {
                console.log("Request done")
                console.log(response)
                setPosts(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })


    }, [option])

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