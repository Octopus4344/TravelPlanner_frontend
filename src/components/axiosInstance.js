import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'https://travel-planner-backend.sharkserver.kowalinski.dev'
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
                const response = await axios.post('https://travel-planner-backend.sharkserver.kowalinski.dev/api/refresh', {refresh: refreshToken});
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
