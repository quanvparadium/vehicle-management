import axios from 'axios';
    const getAllVehicle = async () => {
        try {
            const response = await axios.get('http://localhost:3000/vehicle');
            return response;
        } catch (error)
        {
            console.error('Error getting vehicles:', error);
            throw error;
        }
        
    };
    const addVehicle = async (vehicleData) => {
        try {
            const response = await axios.post('http://localhost:3000/vehicle',vehicleData);
            return response;
        } catch (error) {
            console.error('Error adding vehicle:', error)
        }
    };
    const updateVehicle = async (vehicleID,updateData) => {
        try {
            const response = await axios.put('http://localhost:3000/vehicle',updateData);
            return response;
        } catch (error) {
            console.error(`Error updating vehicle ${vehicleID}:`, error)
            throw error;
        }
    };
    const deleteVehicle = async (vehicleID) => {
        try {
            const response = await axios.delete('http://localhost:3000/vehicle/${vehicleID}');
            return response;
        } catch (error) {
            console.error(`Error deleting vehicle ${vehicleID}:`, error);
            throw error;
        }
    };

export {getAllVehicle, addVehicle, updateVehicle, deleteVehicle}; 