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
        if (!data.email) {
            // Hiển thị thông báo lỗi cho người dùng
            console.error("Email is required");
            return Promise.reject(new Error("Email is required"));
        }
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
