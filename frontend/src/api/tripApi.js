import axiosClient from "./axiosClient";

const TripApi = {
    getAll() {
        return axiosClient.get("/trip/", {});
    },

    add(json) {
        return axiosClient.post("/trip/", json, {});
    },

    delete(id) {
        return axiosClient.delete("/trip/", {
            data: { _id: id },
        });
    },

    update(id, sta) {
        return axiosClient.put("/trip/", {
            ExistTrip: { _id: id },
            Update: { status: sta },
        });
    },
};

export default TripApi;
