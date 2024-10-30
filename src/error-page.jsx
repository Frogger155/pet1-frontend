import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
    const error = useRouteError()

    return (
        <div class="bg-gray-100">
            <div class="h-screen flex flex-col justify-center items-center">
                <h1 class="text-8xl font-bold text-gray-800">{ error.statusText || error.message }</h1>
                <p class="text-4xl font-medium text-gray-800">Возникла ошибка при загрузке этой страницы</p>
                <a href="/" class="mt-4 text-2xl text-blue-800 hover:underline">На начальную страницу</a>
            </div>
        </div>
    )
}