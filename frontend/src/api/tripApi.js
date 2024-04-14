import axiosClient from "./axiosClient";

const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjYwYWY5YzQzY2M3YTAwOWI3NmVlZDg1IiwidG9rZW5UeXBlIjowLCJpYXQiOjE3MTMwMjQ3NzMsImV4cCI6MTcxMzExMTE3M30.RQYOHbObSkNyVaqrRJ5xROfox7e1LWKaANEJHe60I88";

const TripApi = {
    getAll() {
        return axiosClient.get("/trip/ListTrip", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },

    addNewTrip(json) {
        return axiosClient.get("/trip/AddTrip", json);
    },

    delete(id) {
        const json = {
            _id: id,
        };
        return axiosClient.delete("/trip/DeleteTrip", json, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};

export default TripApi;
