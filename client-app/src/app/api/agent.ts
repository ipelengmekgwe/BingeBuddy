import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://localhost:7038/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: async (url: string) => await axios.get(url).then(responseBody),
    post: async (url: string, body: {}) => await axios.post(url, body).then(responseBody),
    put: async (url: string, body: {}) => await axios.put(url, body).then(responseBody),
    del: async (url: string) => await axios.delete(url).then(responseBody)
}

const Shows = {
    list: () => requests.get('/shows')
}

const agent = {
    Shows
}

export default agent;