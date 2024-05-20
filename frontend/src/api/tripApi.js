import axiosClient from "./axiosClient";
import Cookies from "js-cookie";

const TripApi = {
    getAll() {
        const token = Cookies.get("token");
        return axiosClient.get("/trip/", {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    getVehicle() {
        const token = Cookies.get("token");
        return axiosClient.get("/trip/vehicle", {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    add(json) {
        const token = Cookies.get("token");
        return axiosClient.post("/trip/", json, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    delete(id) {
        const token = Cookies.get("token");
        return axiosClient.delete("/trip/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { _id: id },
        });
    },

    update(id, sta) {
        const token = Cookies.get("token");
        return axiosClient.put(
            "/trip/",
            {
                ExistTrip: { _id: id },
                Update: { status: sta },
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    },
};

export default TripApi;
