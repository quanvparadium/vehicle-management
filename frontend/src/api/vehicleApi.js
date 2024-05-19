import axiosClient from "./axiosClient";
import Cookies from "js-cookie"
const VehicleApi = {
    getAllVehicle() {
        const token = Cookies.get("token")
        return  axiosClient.get(`/vehicles`,
            { headers: { Authorization: `Bearer ${token}`}}
        );
    },
    getVehicle(vehicleID) {
        const token = Cookies.get("token")
        return axiosClient.get(`/vehicles/${vehicleID}`,
        { headers: { Authorization: `Bearer ${token}`}}
        );
    },
    addVehicle(vehicleData) {
        const token = Cookies.get("token")
        return axiosClient.post(`/vehicles`, vehicleData,
        { headers: { Authorization: `Bearer ${token}`}}
        );
    },
    updateVehicle(id,updateData) {
        const token = Cookies.get("token")
        return axiosClient.put(`/vehicles/${id}`,updateData,
        { headers: { Authorization: `Bearer ${token}`}}
        );
        
    },

    deleteVehicle(vehicleID) {
        const token = Cookies.get("token")
        return axiosClient.delete(`/vehicles/${vehicleID}`,
        { headers: { Authorization: `Bearer ${token}`}}
        );
    },
};
export default VehicleApi;

// export {getAllVehicle, addVehicle, updateVehicle, deleteVehicle};
