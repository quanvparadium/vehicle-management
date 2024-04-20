import axiosClient from "./axiosClient";

const driverApi = {
    getAll(x) {
        const url = `/drivers`;
        return axiosClient.get(url);
    },

    get(id) {
        const url = `/drivers/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/drivers`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/drivers/${data._id}`;
        console.log("data patch", data);
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/drivers/${id}`;
        return axiosClient.delete(url);
    },
};

export default driverApi;
