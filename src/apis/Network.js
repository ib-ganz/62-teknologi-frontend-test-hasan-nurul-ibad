import axios from "axios";

const base = 'https://be62.kebandigital.com/'
// const base = 'http://localhost:8000/'
const base_url = `${base}api/`
const base_url_live = `${base}api/yelp/`

const AxiosInstance = axios.create({
    baseURL: base_url,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer`,
    },
})

const liveAxios = axios.create({
    baseURL: base_url_live, // membuat proxy sendiri di BE untuk menghindari CORS
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `x`,
    },
})

export const AxiosInstanceLive = {
    get: async (url) => {

        // saya console log kan url yelp nya supaya bisa dilihat,
        // karena yang saya kirim ke BE adalah berupa base64 dari url tsb.
        // jika dikirimkan urlnya apa adanya (tanpa base64), entah kenapa masih kena CORS terus

        const yelpUrl = `https://api.yelp.com/v3/${url}`
        console.log(`[62 LOG] requesting to ${yelpUrl} using custom proxy`)
        return liveAxios.get(btoa(yelpUrl))
    }
}

export default AxiosInstance;