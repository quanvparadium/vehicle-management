import axiosClient from "./axiosClient";

const loginApi = {
    getAll(x) {
        const url = `/login`;
        return axiosClient.get(url, {params: x});
    },

    get(id) {
        const url = `/login/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/login`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/login/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/login/${id}`;
        return axiosClient.delete(url);
    } 
}

export default loginApi;