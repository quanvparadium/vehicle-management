import axiosClient from "./axiosClient";
import Cookie from "js-cookie";

const TripApi = {
    getAll() {
        const token = Cookie.get("token");
        return axiosClient.get("/trip/", {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    add(json) {
        const token = Cookie.get("token");
        return axiosClient.post("/trip/", json, {
            headers: { Authorization: `Bearer ${token}` },
        });
    },

    delete(id) {
        const token = Cookie.get("token");
        return axiosClient.delete(
            "/trip/",
            {
                data: { _id: id },
            },
            { headers: { Authorization: `Bearer ${token}` } }
        );
    },

    update(id, sta) {
        const token = Cookie.get("token");
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
