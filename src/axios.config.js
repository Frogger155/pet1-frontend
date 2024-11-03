import axios from "axios"
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

//Создаем инстанс аксиоса, чтобы при каждом запросе добавлялся заголовок
//с токенами

const axiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 5000,
})

export default axiosInstance
