import axiosClient from "./axiosClient";

const driverApi = {
    getAll(x) {
        const url = `/driver`;
        return axiosClient.get(url, {params: x});
    },

    get(id) {
        const url = `/driver/${id}`;
        return axiosClient.get(url);
    },

    add(data) {
        const url = `/driver`;
        return axiosClient.post(url, data);
    },

    update(data) {
        const url = `/driver/${data.id}`;
        return axiosClient.patch(url, data);
    },

    remove(id) {
        const url = `/driver/${id}`;
        return axiosClient.delete(url);
    } 
}

export default driverApi;