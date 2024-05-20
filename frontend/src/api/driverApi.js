import axiosClient from "./axiosClient";
import Cookie from "js-cookie";

const driverApi = {
    getAll() {
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
        return axiosClient.put(url, data);
    },

    remove(id) {
        const url = `/drivers/${id}`;
        return axiosClient.delete(url);
    },
};

export default driverApi;
