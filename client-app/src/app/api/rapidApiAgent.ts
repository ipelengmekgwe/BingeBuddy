import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://imdb8.p.rapidapi.com';
axios.defaults.headers.common = {
    'X-RapidAPI-Key': '0a8ec6fa28msh7e61c62826a8db0p1f9f80jsn5d45399f5404', //process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
};

axios.interceptors.response.use(async response => {
    try {
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: async (url: string, params?: {}) => await axios.get(url, {params: params}).then(responseBody)
}

const Shows = {
    popular: () => requests.get('/title/get-most-popular-tv-shows'),
    search: (searchStr: string) => requests.get('/auto-complete', {q: searchStr}),
    description: (imdbId: string) => requests.get('/title/get-overview-details', {tconst: imdbId}),
    seasons: (imdbId: string) => requests.get('/title/get-seasons', {tconst: imdbId}),
    find: (searchStr: string, limit: number = 20) => requests.get('/title/v2/find', {title: searchStr, limit: limit})
}

const rapidApiAgent = {
    Shows
}

export default rapidApiAgent;