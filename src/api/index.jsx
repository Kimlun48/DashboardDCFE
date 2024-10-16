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
//                 if (refreshToken) {
//                     const response = await Api.post('/api/refresh', { refreshToken });
//                     if (response.status === 200) {
//                         const { accessToken } = response.data;
//                         Cookies.set('access_token', accessToken, {
//                             secure: process.env.NODE_ENV === 'production',
//                             sameSite: 'None'
//                         });
//                         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//                         return Api(originalRequest);
//                     }
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

// Interceptor untuk menambahkan token otorisasi ke setiap permintaan
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
                    
                    const response = await Api.post('/api/refresh', { refresh_token: refreshToken });

                    if (response.status === 200) {
                        const { access_token } = response.data;
                       
                        Cookies.set('access_token', access_token, {
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'None'
                        });
                       
                        originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
                       
                        return Api(originalRequest);
                    }
                }
            } catch (refreshError) {
                // Hapus token dan arahkan ke login jika penyegaran gagal
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                window.location = '/admin/login';
            }
        }
        return Promise.reject(error);
    }
//     async (error) => {
//         const originalRequest = error.config;
    
//         // Jika respons 401 dan belum dicoba ulang
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
    
//             try {
//                 const refreshToken = Cookies.get('refresh_token');
//                 if (refreshToken) {
//                     // Dapatkan token baru
//                     const response = await Api.post('/api/refresh', { refresh_token: refreshToken });
//                     if (response.status === 200) {
//                         const { access_token } = response.data;
//                         Cookies.set('access_token', access_token, {
//                             secure: process.env.NODE_ENV === 'production',
//                             sameSite: 'None',
//                         });
//                         originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
//                         return Api(originalRequest);
//                     }
//                 }
//             } catch (refreshError) {
//                 // Jika refresh gagal, arahkan ke login
//                 Cookies.remove('access_token');
//                 Cookies.remove('refresh_token');
//                 window.location = '/admin/login';
//             }
//         }
    
//         // Jika error bukan 401, atau token refresh juga gagal
//         if (error.response && error.response.status === 403) {
//             // Penanganan khusus untuk status 403 (Forbidden)
//             alert('Anda tidak memiliki izin untuk melakukan aksi ini.');
//         }
    
//         return Promise.reject(error);
//     }
    
 );

export default Api;
