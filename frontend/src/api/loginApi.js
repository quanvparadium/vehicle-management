import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

const loginApi = {
    getAll(x) {
        const token = Cookies.get("token");
        const url = `/login`;
        return axiosClient.get(url, {params: x}, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    get(id) {
        const token = Cookies.get("token");
        const url = `/login/${id}`;
        return axiosClient.get(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    add(data) {
        const token = Cookies.get("token");
        const url = `/login`;
        return axiosClient.post(url, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    update(data) {
        const token = Cookies.get("token");
        const url = `/login/${data.id}`;
        return axiosClient.patch(url, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    remove(id) {
        const token = Cookies.get("token");
        const url = `/login/${id}`;
        return axiosClient.delete(url, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } 
}

export default loginApi;