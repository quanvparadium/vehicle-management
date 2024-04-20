import "./styles.css";
import { useEffect, useState } from "react";
import {addVehicle, getAllVehicle, updateVehicle, deleteVehicle, getVehicle} from '../../api/vehicleApi';
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
    const [editID, setEditId] = useState(-1);
    // Lấy danh sách phương tiện từ API khi component được load và khi thêm mới phương tiện
    useEffect(() => {
        async function fetchVehicle() {
            try {
                const response = await getAllVehicle();
                console.log("Response", response)
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
    //
    const handleEdit = async (id) => {
        try {
            const res = await getVehicle(id);
            setUpdate(res);
            setEditId(id);
        } catch (error) {
            console.error('Error edit vehicle:', error);
        }
    };
    //
    const handleUpdateChange = (e, fieldName) => {
        const { value } = e.target;
        setUpdate((prevData) => ({
            ...prevData,
            [fieldName]: value
        }));
    };
    // Hàm xử lý cập nhật thông tin phương tiện
    const handleUpdate = async (e) => {
        try {
            // Gửi request để cập nhật phương tiện

            await updateVehicle(update);
            const res = await getAllVehicle();
            setVehicleList(res);
            
            setEditId(-1);
            // Cập nhật lại danh sách phương tiện
            setAdding(true);
            // Đặt lại form và thông báo lỗi
           // setUpdate(initialFormData);
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };
    // Hàm xử lý xóa phương tiện
    const handleDelete = async (id) => {
        try {
            // Gửi request để xóa phương tiện
            await deleteVehicle(id);
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
    <div className="vehicle_container">
        <h1 style={{ marginTop: "6px", fontWeight: "bold" }}>Vehicle information</h1>
            <div className="page">
                <div className="vehicle">
                <form className="form" onSubmit={handleSubmit}>
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
                        <th>Runner kilometers(km)</th>
                        <th>Recent maintenance date </th>
                        <th>Positon</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                         {vehicleList.map((vehicle, index) => (
                            vehicle.id === editID ?
                            <tr key={index} className="edit">
                                <td>{vehicle.id}</td>
                                <td><input type='text' required className="update" value = {update.type} onChange={(e) => handleUpdateChange(e,'type')}/></td>
                                <td><input type='text' required className="update" value = {update.automaker} onChange={(e) => handleUpdateChange(e, 'automaker')}/></td>
                                <td><input type='text' required className="update" value = {update.model} onChange={(e) => handleUpdateChange(e,'model')}/></td>
                                <td><input type='text' required className="update" value = {update.licensePlates} onChange={(e) => handleUpdateChange(e,'licensePlates')}/></td>
                                <td><input type='text' required className="update" value = {update.chassisNumber} onChange={(e) => handleUpdateChange(e, 'chassisNumber')}/></td>
                                <td><input type='text'required className="update" value = {update.frameNumber} onChange={(e) => handleUpdateChange(e, 'frameNumber')}/></td>
                                <td>{vehicle.state}</td>
                                <td>{vehicle.fuelState}</td>
                                <td>{vehicle.runnerKms}</td>
                                <td>{vehicle.recentMaintenance}</td>
                                <td>{vehicle.position}</td>
                                <td>{vehicle.notes}</td>
                                <td style = {{justifyContent: "space-around"}}> 
                                    <button type="submit" className="update" onClick={() => handleUpdate()}>Update</button>
                                </td>
                            </tr>
                            :
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
                                    <button onClick={() => handleEdit(vehicle.id)}>Edit</button>
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