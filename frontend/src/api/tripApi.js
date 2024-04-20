import axiosClient from "./axiosClient";

const tripApi = {
    getAll(x) {
        const url = `/api/trip`;
        return axiosClient.get(url, {params: x});
    },

    get(id) {
        const url = `/api/trip/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/api/trip`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/api/trip/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/api/trip/${id}`;
        return axiosClient.delete(url);
    },
}

export default tripApi;