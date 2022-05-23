import axios from "axios"
import { API_URL } from "./config";

// TODO: answer here
export const getPosts = () => {
    return axios.get(`${API_URL}/post/list`, { withCredentials: true });
}

export const createPost = (formData) => {
    return axios.post(`${API_URL}/post/create`, formData, { withCredentials: true });
}