import AxiosInstance, {AxiosInstanceLive} from "./Network";

export async function get(params = {}) {
    return AxiosInstance.get(`businesses/search?${new URLSearchParams(params).toString()}`).then((r) => {
        return r.data
    }).catch((e) => {
        return {
            success: false,
            message: 'Network Error'
        };
    });
}

export async function detail(id) {
    return AxiosInstance.get(`businesses/detail/${id}`).then((r) => {
        return r.data
    }).catch((e) => {
        return {
            success: false,
            message: 'Network Error'
        };
    });
}

export async function getReviews(alias, sort, offset) {
    // munggunakan api yelp live, karena sudah ada datanya banyak
    // sebenernya ini sudah pake param offset untuk pagination, tp respon dr yelp nya memang selalu sama
    return AxiosInstanceLive.get(`businesses/${encodeURIComponent(alias)}/reviews?offset=${offset}&limit=20&sort_by=${sort}`).then((r) => {
        return r
    }).catch((e) => {
        return {
            success: false,
            message: 'Network Error'
        };
    });
}
