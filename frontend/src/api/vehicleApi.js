import axiosClient from "./axiosClient";
const VehicleApi = {
    getAllVehicle() {
        return  axiosClient.get(`/vehicles`);
    },
    getVehicle(vehicleID) {
   
        return axiosClient.get(`/vehicles/${vehicleID}`);
    },
    addVehicle(vehicleData) {

        return axiosClient.post(`/vehicles`, vehicleData);
    },
    updateVehicle(id,updateData) {
        return axiosClient.put(`/vehicles/${id}`,updateData);
        
    },

    deleteVehicle(vehicleID) {
        return axiosClient.delete(`/vehicles/${vehicleID}`);
    },
};
export default VehicleApi;

// export {getAllVehicle, addVehicle, updateVehicle, deleteVehicle};
