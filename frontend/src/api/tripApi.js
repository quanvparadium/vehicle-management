import axiosClient from "./axiosClient";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYwYWY5YzQzY2M3YTAwOWI3NmVlZDg1IiwidG9rZW5UeXBlIjowLCJpYXQiOjE3MTMxNjk0ODcsImV4cCI6MTcxMzI1NTg4N30.p0of02GKhEyKM0BNb7iHWSjqjpC_VMZLQSIk9fuqwGQ";

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
