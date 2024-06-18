import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
})


axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        console.log(`Trying to refresh, the code: ${error.response.status}`)
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            console.log("Starting a refresh process")
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh-token");
                const response = await axios.post('http://localhost:8000/api/refresh', {refresh: refreshToken});
                localStorage.setItem('access-token', response.data.access);
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`
                console.log("token refreshed")
                return axiosInstance(originalRequest);
            }catch (refreshError){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                console.error('Unable to refresh token', refreshError)
            }
        } else{console.log('Something went wrong')}
        if(originalRequest._retry){
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
        return Promise.reject(error)
    }
)

export default axiosInstance;
