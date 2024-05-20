import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

const driverApi = {
    getAll() {
        const token = Cookies.get("token");
        const url = `/drivers`;
        return axiosClient.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    get(id) {
        const token = Cookies.get("token");
        const url = `/drivers/${id}`;
        return axiosClient.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    add(data) {
        const token = Cookies.get("token");
        const url = `/drivers`;
        return axiosClient.post(url, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(data) {
        const token = Cookies.get("token");
        const url = `/drivers/${data._id}`;
        console.log("data patch", data);
        return axiosClient.patch(url, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    remove(id) {
        const token = Cookies.get("token");
        const url = `/drivers/${id}`;
        return axiosClient.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },
};

export default driverApi;
