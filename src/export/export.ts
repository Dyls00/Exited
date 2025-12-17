import axios from "axios";

export async function getData(url) {
    const promise = axios.get(url)

    const response = await promise;
    return response.data;
}