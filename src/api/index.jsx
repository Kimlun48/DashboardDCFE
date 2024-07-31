import axios from 'axios';
import Cookies from 'js-cookie';

const Api = axios.create({
    baseURL: import.meta.env.VITE_APP_BASEURL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: true, 
});

Api.interceptors.request.use(
    (config) => {
        const token = Cookies.get('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refresh_token');
                if (refreshToken) {
                    const response = await Api.post('/api/refresh', { refreshToken });
                    if (response.status === 200) {
                        const { accessToken } = response.data;
                        Cookies.set('access_token', accessToken, {
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'None'
                        });
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        return Api(originalRequest);
                    }
                }
            } catch (refreshError) {
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                window.location = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
);

export default Api;

// import necessary packages
// import axios from 'axios';
// import Cookies from 'js-cookie';

// const Api = axios.create({
//     baseURL: import.meta.env.VITE_APP_BASEURL,
//     headers: {
//         "Accept": "application/json",
//         "Content-Type": "application/json",
//     },
//     withCredentials: true, 
// });

// Api.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('access_token');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Api.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const refreshToken = Cookies.get('refresh_token');
//                 const response = await axios.post(`${import.meta.env.VITE_APP_BASEURL}/api/refresh`, { refreshToken });
//                 if (response.status === 200) {
//                     const { accessToken } = response.data;
//                     Cookies.set('access_token', accessToken);
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//                     return Api(originalRequest);
//                 }
//             } catch (refreshError) {
//                 Cookies.remove('access_token');
//                 Cookies.remove('refresh_token');
//                 window.location = '/admin/login';
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default Api;

