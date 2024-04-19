import axiosClient from "./axiosClient";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYwYWY5YzQzY2M3YTAwOWI3NmVlZDg1IiwidG9rZW5UeXBlIjowLCJpYXQiOjE3MTM1Mzk2NjMsImV4cCI6MTcxMzYyNjA2M30.97K-hSTeDW8bAEs4TDYRutdMbCnjTgn0KI0orVmP40s";

const TripApi = {
    getAll() {
        return axiosClient.get("/trip/ListTrip", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    add(json) {
        return axiosClient.post("/trip/AddTrip", json, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    delete(id) {
        return axiosClient.delete("/trip/DeleteTrip", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { _id: id },
        });
    },

    update(id, sta) {
        return axiosClient.put(
            "/trip/UpdateTrip",
            { ExistTrip: { _id: id }, Update: { status: sta } },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    },
};

export default TripApi;
