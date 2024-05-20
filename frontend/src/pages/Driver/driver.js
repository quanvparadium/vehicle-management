import { useEffect, useState } from "react";
import "./styles.css";
import driverApi from "../../api/driverApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faPenToSquare,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function Driver() {
    const initialFormData = {
        fullname: "",
        phone_number: "",
        date_of_birth: "",
        identification: "",
        address: "",
        email: "",
        expire_license: "",
        experience: "",
        state: "",
    };

    const initialError = {
        fullname: false,
        phone_number: false,
        date_of_birth: false,
        identification: false,
        address: false,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [update, setUpdate] = useState(initialFormData);

    const [adding, setAdding] = useState(false); //render lại table khi add
    const [driverList, setDriverList] = useState([]);
    const [editID, setEditID] = useState(-1);
    const [error, setError] = useState(initialError);

    useEffect(
        () => {
            async function fetchDriver() {
                try {
                    const temp = await driverApi.getAll();
                    setDriverList(temp);
                    setAdding(false);
                } catch (error) {
                    console.error("Error creating driver:", error);
                }
            }
            fetchDriver();
        },
        [adding] //khi adding thay đổi thì useEffect này lại
    );

    // function check(formData) {
    //     if (typeof(formData.fullname) !== String) return false;

    // }

    async function handleAdd() {
        // const ID =  await driverApi.getNewID();
        // formData.id = ID + 1;
        let check = true;
        // for (let field in formData) {
        //     if (field === "email") break;
        //     if (formData[field] === "") {
        //         check = false;
        //         break;
        //     }
        // }

        setFormData(prevFormData => ({
            ...prevFormData,
            state: 'ACTIVE'
        }));

        if (check) {
            await driverApi.add(formData);
            setAdding(true);
            setFormData(initialFormData);
        }
    }

    //e là value?
    function handleAddChange(e) {
        const { name, value } = e.target;

        setFormData(
            //thay đổi dựa trên trạng thái cũ chứ không ghi đè lên làm mất state cũ
            function (prevState) {
                return {
                    ...prevState,
                    [name]: value,
                };
            }
        );
    }

    function handleBlur(e) {
        const { name, value } = e.target;
        if (value === "") {
            setError((prevState) => ({ ...prevState, [name]: true }));
        } else {
            setError((prevState) => ({ ...prevState, [name]: false }));
        }
    }

    //
    async function handleEdit(id) {
        console.log(id);

        const temp = await driverApi.get(id);
        console.log(temp);
        setUpdate(temp);
        setEditID(id);
    }

    function handleUpdateChange(e, fieldName) {
        const { value } = e.target;

        setUpdate((prevState) => ({
            ...prevState,
            [fieldName]: value,
        }));
    }

    function handleUpdate(id) {
        try {
            driverApi.update(update);
            setEditID(-1);
            setAdding(true);
        } catch (error) {
            console.error("Error updating driver:", error);
        }
    }

    async function handleDelete(id) {
        await driverApi.remove(id);
        setAdding(true);
    }

    return (
        <div className="driver_container">
            {/* <h1 className='header'>DRIVER</h1> */}

            <div className="add">
                <div className="addBox">
                    <label className="addBox_label">
                        Fullname <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input
                        type="text"
                        className={`addInputText ${
                            error.fullname ? "errorInput" : ""
                        }`}
                        name="fullname"
                        onChange={handleAddChange}
                        value={formData.fullname}
                        onBlur={handleBlur}
                    ></input>
                    {error.fullname && (
                        <span className="message">This field is required.</span>
                    )}
                </div>

                <div className="addBox">
                    <label className="addBox_label">
                        Phone number <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input
                        type="text"
                        className={`addInputText ${
                            error.phone_number ? "errorInput" : ""
                        }`}
                        name="phone_number"
                        onChange={handleAddChange}
                        value={formData.phone_number}
                        onBlur={handleBlur}
                    ></input>
                    {error.phone_number && (
                        <span className="message">This field is required.</span>
                    )}
                </div>

                <div className="addBox">
                    <label className="addBox_label">
                        Date of birth <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input
                        type="date"
                        className={`addInputText ${
                            error.date_of_birth ? "errorInput" : ""
                        }`}
                        name="date_of_birth"
                        onChange={handleAddChange}
                        value={formData.date_of_birth}
                        onBlur={handleBlur}
                    ></input>
                    {error.date_of_birth && (
                        <span className="message">This field is required.</span>
                    )}
                </div>

                <div className="addBox">
                    <label className="addBox_label">
                        Identification <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input
                        type="text"
                        className={`addInputText ${
                            error.identification ? "errorInput" : ""
                        }`}
                        name="identification"
                        onChange={handleAddChange}
                        value={formData.identification}
                        onBlur={handleBlur}
                    ></input>
                    {error.identification && (
                        <span className="message">This field is required.</span>
                    )}
                </div>

                <div className="addBox">
                    <label className="addBox_label">
                        Address <span style={{ color: "red" }}>*</span>{" "}
                    </label>
                    <input
                        type="text"
                        className={`addInputText ${
                            error.address ? "errorInput" : ""
                        }`}
                        name="address"
                        onChange={handleAddChange}
                        value={formData.address}
                        onBlur={handleBlur}
                    ></input>
                    {error.address && (
                        <span className="message">This field is required.</span>
                    )}
                </div>

                <div className="addBox">
                    <label className="addBox_label">Email</label>
                    <input
                        type="text"
                        className="addInputText"
                        name="email"
                        onChange={handleAddChange}
                        value={formData.email}
                    ></input>
                    <span className="message"></span>
                </div>

                <div className="addBox">
                    <label className="addBox_label">Expire License</label>
                    <input
                        type="date"
                        className="addInputText"
                        name="expire_license"
                        onChange={handleAddChange}
                        value={formData.expire_license}
                    ></input>
                    <span className="message"></span>
                </div>

                <div className="addBox">
                    <label className="addBox_label">Experience</label>
                    <input
                        type="text"
                        className="addInputText"
                        name="experience"
                        onChange={handleAddChange}
                        value={formData.experience}
                    ></input>
                    <span className="message"></span>
                </div>

                <button className="addButton" onClick={handleAdd}>
                    <span className="addSpan">
                        <FontAwesomeIcon
                            icon={faUserPlus}
                            style={{ height: "22px", marginRight: "10px" }}
                        />
                        <p style={{ fontSize: "large" }}>Add driver</p>
                    </span>
                </button>
            </div>

            <div className="read">
                <table className="list">
                    <thead>
                        <tr className="headerTable">
                            <th>Identification</th>
                            <th>Fullname</th>
                            <th>Phone number</th>
                            <th>Date of birth</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Expire License</th>
                            <th>Experience</th>
                            <th>State</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {driverList.map((driver, index) =>
                            driver._id === editID ? (
                                <tr key={index}>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            className="updateInput"
                                            value={update.identification}
                                            onChange={(e) =>
                                                handleUpdateChange(
                                                    e,
                                                    "identification"
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            className="updateInput"
                                            value={update.fullname}
                                            onChange={(e) =>
                                                handleUpdateChange(
                                                    e,
                                                    "fullname"
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            className="updateInput"
                                            value={update.phone_number}
                                            onChange={(e) =>
                                                handleUpdateChange(
                                                    e,
                                                    "phone_number"
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="date"
                                            className="updateInput"
                                            value={update.date_of_birth}
                                            onChange={(e) =>
                                                handleUpdateChange(
                                                    e,
                                                    "date_of_birth"
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            className="updateInput"
                                            value={update.address}
                                            onChange={(e) =>
                                                handleUpdateChange(e, "address")
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            className="updateInput"
                                            value={update.email}
                                            onChange={(e) =>
                                                handleUpdateChange(e, "email")
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="date"
                                            className="updateInput"
                                            value={update.expire_license}
                                            onChange={(e) =>
                                                handleUpdateChange(
                                                    e,
                                                    "expire_license"
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            className="updateInput"
                                            value={update.experience}
                                            onChange={(e) =>
                                                handleUpdateChange(
                                                    e,
                                                    "experience"
                                                )
                                            }
                                        />{" "}
                                    </td>
                                    <td>
                                        {" "}
                                        <input
                                            type="text"
                                            className="updateInput"
                                            value={update.state}
                                            onChange={(e) =>
                                                handleUpdateChange(
                                                    e,
                                                    "state"
                                                )
                                            }
                                        />{" "}
                                    </td>

                                    <td colSpan={2}>
                                        {" "}
                                        <button
                                            onClick={() =>
                                                handleUpdate(driver._id)
                                            }
                                        >
                                            Update
                                        </button>{" "}
                                    </td>
                                </tr>
                            ) : (
                                <tr key={index}>
                                    <td>{driver.identification}</td>
                                    <td>{driver.fullname}</td>
                                    <td>{driver.phone_number}</td>
                                    <td>{driver.date_of_birth}</td>
                                    <td>{driver.address}</td>
                                    <td>{driver.email}</td>
                                    <td>{driver.expire_license}</td>
                                    <td>{driver.experience}</td>
                                    <td>{driver.state}</td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleEdit(driver._id)
                                            }
                                        >
                                            {" "}
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                            />{" "}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDelete(driver._id)
                                            }
                                        >
                                            {" "}
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                            />{" "}
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Driver;
