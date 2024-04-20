import axiosClient from "./axiosClient";

export const getAllVehicle = async () => {
    try {
        const response = await axiosClient.get(`/vehicle`);
        return response;
    } catch (error) {
        console.error("Error getting vehicles:", error);
        throw error;
    }
};
export const getVehicle = async (id) => {
    try {
        const response = await axiosClient.get(`/vehicle/` + id);
        return response;
    } catch (error) {
        console.error("Error getting vehicles:", error);
        throw error;
    }
};
export const addVehicle = async (vehicleData) => {
    try {
        console.log("Vehicle add", vehicleData);
        const response = await axiosClient.post(`/vehicle`, vehicleData);
        return response;
    } catch (error) {
        console.error("Error adding vehicle:", error);
    }
};
export const updateVehicle = async (updateData) => {
    try {
        const response = await axiosClient.put(
            `/vehicle/` + updateData.id,
            updateData
        );
        return response;
    } catch (error) {
        console.error(`Error updating vehicle :`, error);
        throw error;
    }
};

export const deleteVehicle = async (vehicleID) => {
    try {
        console.log("Vehicle delete", vehicleID);
        return await axiosClient.delete("/vehicle/" + vehicleID);
    } catch (error) {
        console.error(`Error deleting vehicle ${vehicleID}:`, error);
        throw error;
    }
};

// export {getAllVehicle, addVehicle, updateVehicle, deleteVehicle};
