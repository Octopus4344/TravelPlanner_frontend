import axios from "axios";
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
})


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const navigate = useNavigate();
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh-token");
                const response = await axios.post('http://localhost:8000/api/refresh', {refresh: refreshToken});
                localStorage.setItem('access-token', response.data.access);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
                console.log("token refreshed")
                return axiosInstance(originalRequest);
            }catch (refreshError){
                console.error('Unable to refresh token', refreshError)
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                navigate('/');
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;
