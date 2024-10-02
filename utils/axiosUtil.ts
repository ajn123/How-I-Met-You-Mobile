import axios from "axios";


export default function axiosUtil() {
    return axios.create({
        baseURL: 'http://localhost/api',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}