import axiosClient from "./axiosClient";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYwYWY5YzQzY2M3YTAwOWI3NmVlZDg1IiwidG9rZW5UeXBlIjowLCJpYXQiOjE3MTM2MzA1NjIsImV4cCI6MTcxMzcxNjk2Mn0.-Xs8DRc6AxqtKuuB0iUmrFwc5E3Sv97IYii4FPrxR6c";

const TripApi = {
    getAll() {
        return axiosClient.get("/trip/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    add(json) {
        return axiosClient.post("/trip/", json, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    delete(id) {
        return axiosClient.delete("/trip/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { _id: id },
        });
    },

    update(id, sta) {
        return axiosClient.put(
            "/trip/",
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
