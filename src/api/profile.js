// TODO: answer here
import axios from "axios"
import { API_URL } from "./config"

export const getProfile = (UserId) => {
    return axios.get(`${API_URL}/profile/${UserId}`, {withCredentials: true})
}