import { useEffect, useState } from 'react';
import './styles.css'
import driverApi from '../../api/driverApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPenToSquare  } from '@fortawesome/free-solid-svg-icons'


function Driver() {
    const initialFormData = {
        fullname: '',
        email: '',
        date_of_birth: '',
        identification: '',
        address: '',
        phone_number: '',
        expire_license: '',
        experience: ''
    };
    const [formData, setFormData] = useState(initialFormData);
    const [update, setUpdate] = useState(initialFormData);

    const [adding, setAdding] = useState(false);    //render lại table khi add
    const [driverList, setDriverList] = useState([]);
    const [editID, setEditID] = useState(-1);

    useEffect(
        () => {
            async function fetchDriver() {
                try {
                    const temp = await driverApi.getAll();
                    setDriverList(temp);
                    setAdding(false);
                } catch(error) {
                    console.error('Error creating driver:', error);
                }
            };
            fetchDriver();
        },
        [adding]    //khi adding thay đổi thì useEffect này lại
    )

    // function check(formData) {
    //     if (typeof(formData.fullname) !== String) return false;
        
    // }

    async function handleAdd() {
        // const ID =  await driverApi.getNewID();
        // formData.id = ID + 1; 
        
        await driverApi.add(formData);
        setAdding(true);
        setFormData(initialFormData);
    };

    function handleAddChange(e) {
        const {name , value} = e.target;

        setFormData(
            //thay đổi dựa trên trạng thái cũ chứ không ghi đè lên làm mất state cũ
            function(prevState) {
                return {
                    ...prevState,
                    [name]: value
                };
            }
        );
    }

    const [errors, setErrors] = useState({})

    // 
    async function handleEdit(id) {
        const temp = await driverApi.get(id);
        setUpdate(temp);
        setEditID(id);
    }

    function handleUpdateChange(e, fieldName) {
        const { value } = e.target;

        setUpdate(prevState => ({
            ...prevState,
            [fieldName]: value
        }));
    }

    function handleUpdate(id) {
        try {
            driverApi.update(update);
            setEditID(-1);
            setAdding(true);
        } catch (error) {
            console.error('Error updating driver:', error);
        }
    }
    
    async function handleDelete(id) {
        await driverApi.remove(id);
        setAdding(true);
    }

    return ( 
        <div className='container'>
            <h1 className='header'>DRIVER</h1>

            <div className='add'>
                <div className='addBox'>
                    <label>Fullname</label>
                    <input type='text' className='addInputText' name="fullname" onChange={handleAddChange} value={formData.fullname}></input>
                    <span className='message'></span>
                </div>

                <div className='addBox'>
                    <label>Email</label>
                    <input type='text' className='addInputText' name="email" onChange={handleAddChange} value={formData.email}></input>
                    <span className='message'></span>
                </div>
                
                <div className='addBox'>
                    <label>Date of birth</label>
                    <input type='date' className='addInputText' name="date_of_birth" onChange={handleAddChange} value={formData.date_of_birth}></input>
                    <span className='message'></span>
                </div>
                
                <div className='addBox'>
                    <label>Identification</label>
                    <input type='text' className='addInputText' name="identification" onChange={handleAddChange} value={formData.identification}></input>
                    <span className='message'></span>
                </div>
                
                <div className='addBox'>
                    <label>Address</label>
                    <input type='text' className='addInputText' name="address" onChange={handleAddChange} value={formData.address}></input>
                    <span className='message'></span>
                </div>

                <div className='addBox'>
                    <label>Phone number</label>
                    <input type='text' className='addInputText' name="phone_number" onChange={handleAddChange} value={formData.phone_number}></input>
                    <span className='message'></span>
                </div>
                
                <div className='addBox'> 
                    <label>Expire License</label>
                    <input type='date' className='addInputText' name="expire_license" onChange={handleAddChange} value={formData.expire_license}></input>
                    <span className='message'></span>
                </div>
                
                <div className='addBox'>
                    <label>Experience</label>
                    <input type='text' className='addInputText' name='experience' onChange={handleAddChange} value={formData.experience}></input>
                    <span className='message'></span>
                </div>
                
                <button className='addButton' onClick={handleAdd}> 
                    <span className='addSpan'> Add </span>
                </button>
            </div>


            <div className='read'>
                <table className='list'>
                    <thead>
                        <tr className='headerTable'>
                            <th>Id</th>
                            <th>Fullname</th>
                            <th>Email</th>
                            <th>Date of birth</th>
                            <th>Identification</th>
                            <th>Address</th>
                            <th>Phone number</th>
                            <th>Expire License</th>
                            <th>Experience</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {driverList.map(
                            (driver, index) => (
                                driver.id === editID ? 
                                <tr key={index}>
                                    <td>{driver.id}</td>
                                    <td> <input type='text' className="updateInput" value={update.fullname} onChange={(e) => handleUpdateChange(e,'fullname')}/> </td>
                                    <td> <input type='text' className="updateInput" value={update.email} onChange={(e) => handleUpdateChange(e, 'email')}/> </td>
                                    <td> <input type='date' className="updateInput" value={update.date_of_birth} onChange={(e) => handleUpdateChange(e, 'date_of_birth')}/> </td>
                                    <td> <input type='text' className="updateInput" value={update.identification} onChange={(e) => handleUpdateChange(e, 'identification')}/> </td>
                                    <td> <input type='text' className="updateInput" value={update.address} onChange={(e) => handleUpdateChange(e, 'address')}/> </td>
                                    <td> <input type='text' className="updateInput" value={update.phone_number} onChange={(e) => handleUpdateChange(e, 'phone_number')}/> </td>
                                    <td> <input type='date' className="updateInput" value={update.expire_license} onChange={(e) => handleUpdateChange(e, 'expire_license')}/> </td>
                                    <td> <input type='text' className="updateInput" value={update.experience} onChange={(e) => handleUpdateChange(e, 'experience')}/> </td>
                                    <td> <button onClick={() => handleUpdate(driver.id)}>Update</button> </td>
                                </tr>
                                :
                                <tr key={index}>
                                    <td>{driver.id}</td>
                                    <td>{driver.fullname}</td>
                                    <td>{driver.email}</td>
                                    <td>{driver.date_of_birth}</td>
                                    <td>{driver.identification}</td>
                                    <td>{driver.address}</td>
                                    <td>{driver.phone_number}</td>
                                    <td>{driver.expire_license}</td>
                                    <td>{driver.experience}</td>
                                    <td style={{display:'flex', justifyContent:"space-around"}}> 
                                        <button onClick={() => handleEdit(driver.id)}> <FontAwesomeIcon icon={faPenToSquare} /> </button>
                                        <button onClick={() => handleDelete(driver.id)}> <FontAwesomeIcon icon={faTrash} /> </button>
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