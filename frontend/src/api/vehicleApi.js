import axiosClient from "./axiosClient";
const VehicleApi = {
    getAllVehicle() {
        return  axiosClient.get(`/vehicles`);
    },
    getVehicle(id) {
   
        return axiosClient.get(`/vehicles/${id}`);
    },
    addVehicle(vehicleData) {

        return axiosClient.post(`/vehicles`, vehicleData);
    },
    updateVehicle(updateData) {
        return axiosClient.put(
            `/vehicles/` + updateData.id,
            updateData
        )
    },

    deleteVehicle(vehicleID) {
        return axiosClient.delete(`/vehicles/${vehicleID}`);
    },
};
export default VehicleApi;

// export {getAllVehicle, addVehicle, updateVehicle, deleteVehicle};
