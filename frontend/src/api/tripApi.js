import axiosClient from "./axiosClient";

const tripApi = {
    getAll(x) {
        const url = `/trip`;
        return axiosClient.get(url, {params: x});
    },

    get(id) {
        const url = `/trip/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/trip`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/trip/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/trip/${id}`;
        return axiosClient.delete(url);
    },
}

export default tripApi;