import axios from "axios";
import { URL_GITHUB_BASE } from "../../utils/url";

export const getUserGithubByUserName = (userName:string) => {
    return axios.get(`${URL_GITHUB_BASE}/users/${userName}`);
}

export const getReposByUserName = (userName:string) => {
    return axios.get(`${URL_GITHUB_BASE}/users/${userName}/repos`);
}
