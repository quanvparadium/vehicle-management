import "./styles.css";
import { useEffect, useState } from "react";
import {addVehicle, getAllVehicle, updateVehicle, deleteVehicle} from '../../api/vehicleApi';
function Vehicle() {
    const initialFormData = {
        type: '',
        licensePlates: '',
        automaker: '',
        model: '',
        chassisNumber: '',
        frameNumber: '',
        state: '',
        fuelState: '',
        runnerKms: '',
        recentMaintenance: '',
        position: '',
        notes: ''
    };
    const initialError = {
        type: false,
        licensePlates: false,
        automaker: false,
        model: false,
        chassisNumber: false,
        frameNumber: false,
        state: false,
        fuelState: false,
        runnerKms: false,
        recentMaintenance: false,
        position: false,
        notes: false
    };

    // State cho form data, cập nhật, thêm, xóa, và danh sách phương tiện
    const [formData, setFormData] = useState(initialFormData);
    const [update, setUpdate] = useState(initialFormData);
    const [adding, setAdding] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [vehicleList, setVehicleList] = useState([]);
    const [error, setError] = useState(initialError);

    // Lấy danh sách phương tiện từ API khi component được load và khi thêm mới phương tiện
    useEffect(() => {
        async function fetchVehicle() {
            try {
                const response = await getAllVehicle();
                setVehicleList(response);
            } catch (error) {
                console.error(error);
            }
        }
        fetchVehicle();
    }, [adding, deleting]);

    // Hàm xử lý thêm mới phương tiện
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Kiểm tra dữ liệu có hợp lệ không
        console.log(formData);
        try {
            // Gửi request để thêm mới phương tiện
            await addVehicle(formData);
            const res = await getAllVehicle();
            setVehicleList(res);
            setAdding(true);
            // Đặt lại form và thông báo lỗi
            setFormData(initialFormData);
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };

    // Hàm xử lý cập nhật thông tin phương tiện
    const handleUpdate = async (id) => {
        try {
            // Gửi request để cập nhật phương tiện
            await updateVehicle(update);
            // Cập nhật lại danh sách phương tiện
            setAdding(true);
            // Đặt lại form và thông báo lỗi
            setUpdate(initialFormData);
            setError(initialError);
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };
    // Hàm xử lý xóa phương tiện
    const handleDelete = async (id) => {
        try {
            // Gửi request để xóa phương tiện
            await deleteVehicle(id);
            const res = await getAllVehicle();
            setVehicleList(res);
            setDeleting(true);
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    

    // Hàm xử lý khi thay đổi giá trị của input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
  
  return (
    <div>
        <h1 style={{ marginTop: "100px", fontWeight: "bold" }}>Vehicle information</h1>
            <div className="page">
                <div className="vehicle">
                <form onSubmit={handleSubmit}>
                        <div className="a">
                            <div className="vehicletype">
                                <label>Vehicle type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.type && <span className="error">Please enter vehicle type</span>}
                            </div>
                            <div className="licenseplates">
                                <label>License plates</label>
                                <input
                                    type="text"
                                    name="licensePlates"
                                    value={formData.licensePlates}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.licensePlates && <span className="error">Please enter license plates</span>}
                            </div>
                        </div>
                        <div className="b">
                            <div className="automaker">
                                <label>Automaker</label>
                                <input
                                    type="text"
                                    name="automaker"
                                    value={formData.automaker}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.automaker && <span className="error">Please enter automaker</span>}
                            </div>
                            <div className="model">
                                <label>Model</label>
                                <input
                                    type="text"
                                    name="model"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.model && <span className="error">Please enter model</span>}
                            </div>
                        </div>
                        <div className="c">
                            <div className="chassisnumber">
                                <label>Chassis number</label>
                                <input
                                    type="text"
                                    name="chassisNumber"
                                    value={formData.chassisNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.chassisNumber && <span className="error">Please enter chassis number</span>}
                            </div>
                            <div className="framenumber">
                                <label>Frame number</label>
                                <input
                                    type="text"
                                    name="frameNumber"
                                    value={formData.frameNumber}
                                    onChange={handleInputChange}
                                    required
                                />
                                {error.frameNumber && <span className="error">Please enter frame number</span>}
                            </div>
                            </div>
                            <div className="add-button">
                                <button type="submit" style={{ fontWeight: "bold" }}>Add</button>
                            </div>
                </form>
                
            </div> 
            <div className="table-wrapper">
            <table className="tableinfor" style={{ overflowY: 'auto', maxHeight: '400px' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Automaker</th>
                        <th>Model</th>
                        <th>License plates</th>
                        <th>Chassis number</th>
                        <th>Frame number</th>
                        <th>State</th>
                        <th>Fuel state</th>
                        <th>Runner_km</th>
                        <th>Recent maintenance date </th>
                        <th>Positon</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                        {/* {vehicleList.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.automaker}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.licensePlates}</td>
                                <td>{vehicle.chassisNumber}</td>
                                <td>{vehicle.frameNumber}</td>
                                <td>{vehicle.state}</td>
                                <td>{vehicle.fuelState}</td>
                                <td>{vehicle.runnerKms}</td>
                                <td>{vehicle.recentMaintenance}</td>
                                <td>{vehicle.position}</td>
                                <td>{vehicle.notes}</td>
                                <td style={{ display: 'flex', justifyContent: "space-around", border: '1px solid black' }}>
                                    <button onClick={() => handleUpdate(vehicle.id)}>Edit</button>
                                    <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                                </td>
                            </tr>
                        ))} */}
                        {   vehicleList.map(vehicle => (
                            <tr key={vehicle.id}>
                                <td>{vehicle.id}</td>
                                <td>{vehicle.type}</td>
                                <td>{vehicle.automaker}</td>
                                <td>{vehicle.model}</td>
                                <td>{vehicle.licensePlates}</td>
                                <td>{vehicle.chassisNumber}</td>
                                <td>{vehicle.frameNumber}</td>
                                <td>{vehicle.state}</td>
                                <td>{vehicle.fuelState}</td>
                                <td>{vehicle.runnerKms}</td>
                                <td>{vehicle.recentMaintenance}</td>
                                <td>{vehicle.position}</td>
                                <td>{vehicle.notes}</td>
                                <td style={{ display: 'flex', justifyContent: "space-around", border: '1px solid black' }}>
                                    <button onClick={() => handleUpdate(vehicle.id)}>Edit</button>
                                    <button onClick={() => handleDelete(vehicle.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        
                </tbody>
            </table>
            </div>
        </div>
    </div>
  );
}

export default Vehicle;