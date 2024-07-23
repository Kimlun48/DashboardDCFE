//import axios
import axios from 'axios';

const Api = axios.create({
   
    baseURL: import.meta.env.VITE_APP_BASEURL,
})

export default Api