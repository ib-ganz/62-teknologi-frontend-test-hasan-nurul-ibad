import AxiosInstance from "./Network";

export async function get() {
    return AxiosInstance.get(`categories`).then((r) => {
        return r.data
    }).catch((e) => {
        return {
            success: false,
            message: 'Network Error'
        };
    });
}
