import "./styles.css";
import { useEffect, useState } from "react";
import VehicleApi from "../../api/vehicleApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faSave } from "@fortawesome/free-solid-svg-icons";

function Vehicle() {
    const initialFormData = {
        type: "",
        licensePlates: "",
        automaker: "",
        model: "",
        chassisNumber: "",
        frameNumber: "",
        state: "",
        fuelState: "",
        odometer: "",
        recentMaintenanceDay: "",
        currentLocation: "",
        notes: "",
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
        odometer: false,
        recentMaintenanceDay: false,
        currentLocation: false,
        notes: false,
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
                const response = await VehicleApi.getAllVehicle();
                setVehicleList(response);
                setAdding(false);
            } catch (error) {
                console.error(error);
            }
        }
        fetchVehicle();
    }, [adding, deleting]);
    // add: update, "khi data modified thi rerender lai"

    // Hàm xử lý thêm mới phương tiện
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Gửi request để thêm mới phương tiện
            await VehicleApi.addVehicle(formData);
            setAdding(true);
            // Đặt lại form và thông báo lỗi
            setFormData(initialFormData);
        } catch (error) {
            console.error("Error adding vehicle:", error);
        }
    };
    //
    async function handleEdit(id) {

            const res = await VehicleApi.getVehicle(id);
            console.log("res",res);
            setUpdate(res)
            setEditId(id);
            
    };
    //
    function handleUpdateChange(e, fieldName) {
        const { value } = e.target;
        setUpdate((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };
    async function handleUpdate(id) {
        try {
            await VehicleApi.updateVehicle(id,update);
            setEditId(-1);
            setAdding(true);
        } catch (error) {
            console.error("Error updating vehicle:", error);
        }
    };
    const handleDelete = async (_id) => {
        try {
            await VehicleApi.deleteVehicle(_id);
            setDeleting(true);
        } catch (error) {
            console.error("Error deleting vehicle:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="vehicle_container">
            <h1 style={{ marginTop: "6px", fontWeight: "bold" }}>
                Vehicle information
            </h1>
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
                                {error.type && (
                                    <span className="error">
                                        Please enter vehicle type
                                    </span>
                                )}
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
                                {error.licensePlates && (
                                    <span className="error">
                                        Please enter license plates
                                    </span>
                                )}
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
                                {error.automaker && (
                                    <span className="error">
                                        Please enter automaker
                                    </span>
                                )}
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
                                {error.model && (
                                    <span className="error">
                                        Please enter model
                                    </span>
                                )}
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
                                {error.chassisNumber && (
                                    <span className="error">
                                        Please enter chassis number
                                    </span>
                                )}
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
                                {error.frameNumber && (
                                    <span className="error">
                                        Please enter frame number
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="add-button">
                            <button
                                type="submit"
                                style={{ fontWeight: "bold" }}
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
                <div className="table-wrapper">
                    <table
                        className="tableinfor"
                        style={{ overflowY: "auto", maxHeight: "400px" }}
                    >
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
                                <th>Odometer (km)</th>
                                <th>Recent maintenance date </th>
                                <th>currentLocation</th>
                                <th>Notes</th>
                                <th colSpan = {2}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicleList.map((vehicle, index) =>
                                vehicle._id === editID ? (
                                    <tr key={index} className="edit">
                                        <td>{vehicle._id}</td>
                                        <td>
                                            <input
                                                type="text"
                                                required
                                                className="update"
                                                value={update.type}
                                                onChange={(e) =>
                                                    handleUpdateChange(
                                                        e,
                                                        "type"
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            
                                            <input
                                                type="text"
                                                required
                                                className="update"
                                                value={update.automaker}
                                                onChange={(e) =>
                                                    handleUpdateChange(
                                                        e,
                                                        "automaker"
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            
                                            <input
                                                type="text"
                                                required
                                                className="update"
                                                value={update.model}
                                                onChange={(e) =>
                                                    handleUpdateChange(
                                                        e,
                                                        "model"
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            
                                            <input
                                                type="text"
                                                required
                                                className="update"
                                                value={update.licensePlates}
                                                onChange={(e) =>
                                                    handleUpdateChange(
                                                        e,
                                                        "licensePlates"
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            
                                            <input
                                                type="text"
                                                required
                                                className="update"
                                                value={update.chassisNumber}
                                                onChange={(e) =>
                                                    handleUpdateChange(
                                                        e,
                                                        "chassisNumber"
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>
                                            
                                            <input
                                                type="text"
                                                required
                                                className="update"
                                                value={update.frameNumber}
                                                onChange={(e) =>
                                                    handleUpdateChange(
                                                        e,
                                                        "frameNumber"
                                                    )
                                                }
                                            />
                                        </td>
                                        <td>{vehicle.state}</td>
                                        <td>{vehicle.fuelState}</td>
                                        <td>{vehicle.odometer}</td>
                                        <td>{vehicle.recentMaintenanceDay}</td>
                                        <td>{vehicle.currentLocation}</td>
                                        <td>{vehicle.notes}</td>
                                        <td colSpan={2}
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        >
                                            <button
                                                type="submit"
                                                className="update"
                                                onClick={() => handleUpdate(vehicle._id)}
                                            >
                                                <FontAwesomeIcon icon={faSave} />
                                            </button>
                                        </td>
                                    </tr>
                                ) : (
                                    <tr key={index}>
                                        <td>{vehicle._id}</td>
                                        <td>{vehicle.type}</td>
                                        <td>{vehicle.automaker}</td>
                                        <td>{vehicle.model}</td>
                                        <td>{vehicle.licensePlates}</td>
                                        <td>{vehicle.chassisNumber}</td>
                                        <td>{vehicle.frameNumber}</td>
                                        <td>{vehicle.state}</td>
                                        <td>{vehicle.fuelState}</td>
                                        <td>{vehicle.odometer}</td>
                                        <td>{vehicle.recentMaintenanceDay}</td>
                                        <td>{vehicle.currentLocation}</td>
                                        <td>{vehicle.notes}</td>
                                        <td
                                            style={{
                                                display: "flex",
                                                justifyContent: "space-around",
                                                border: "1px solid black",
                                            }}
                                        >
                                            <button
                                                onClick={() =>
                                                    handleEdit(vehicle._id)
                                                }
                                            >
                                               <FontAwesomeIcon
                                               icon = {faPenToSquare}
                                               />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDelete(vehicle._id)
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faTrash}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Vehicle;
