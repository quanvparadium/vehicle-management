import Cookies from "js-cookie";
import axios from "axios";
import { BACKEND_URL } from "../config";



const axiosClient = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
    },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Handle successful responses
        return response.data;
    },
    async function (error) {
        // Xử lý response lỗi
        if (error.response && error.response.status === 401) {
            // AccessToken đã hết hạn, cần lấy lại AccessToken mới
            try {
                // Lấy RefreshToken từ localStorage hoặc cookie
                const refreshToken = Cookies.get('refreshToken');

                // Gọi API để lấy AccessToken mới
                const { accessToken } = await refreshAccessToken(refreshToken);

                // Lưu AccessToken mới vào localStorage hoặc cookie
                Cookies.set('accessToken', accessToken);

                // Gửi lại request ban đầu với AccessToken mới
                const config = error.config;
                config.headers.Authorization = `Bearer ${accessToken}`;
                return axiosClient.request(config);
            } catch (err) {
                // Xử lý lỗi khi lấy AccessToken mới
                console.error('Error refreshing access token:', err);
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);
async function refreshAccessToken(refreshToken) {
    // Gọi API để lấy AccessToken mới bằng RefreshToken
    const response = await axios.post('/refresh-token', { refreshToken });
    return response.data;
}


export default axiosClient;