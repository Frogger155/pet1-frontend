import axios from "axios"

const baseURL = 'http://localhost:8000/'

//Создаем инстанс аксиоса, чтобы при каждом запросе добавлялся заголовок
//с токенами

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
})

export default axiosInstance
