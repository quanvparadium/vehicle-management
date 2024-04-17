import axios from 'axios';
import axiosClient from './axiosClient';

export const getAllVehicle = async () => {
    try {
        const response = await axiosClient.get(`/vehicle`);
        return response;
    } catch (error)
    {
        console.error('Error getting vehicles:', error);
        throw error;
    }
    
};
export const addVehicle = async (vehicleData) => {
    try {
        console.log('Vehicle add', vehicleData)
        const response = await axiosClient.post(`/vehicle`, vehicleData);
        return response;
    } catch (error) {
        console.error('Error adding vehicle:', error)
    }
};
export const updateVehicle = async (vehicleID,updateData) => {
    try {
        const response = await axios.put('http://localhost:3000/vehicle',updateData);
        return response;
    } catch (error) {
        console.error(`Error updating vehicle ${vehicleID}:`, error)
        throw error;
    }
};

export const deleteVehicle = async (vehicleID) => {
    try {
        const response = await axios.delete('http://localhost:3000/vehicle/${vehicleID}');
        return response;
    } catch (error) {
        console.error(`Error deleting vehicle ${vehicleID}:`, error);
        throw error;
    }
};

// export {getAllVehicle, addVehicle, updateVehicle, deleteVehicle}; 