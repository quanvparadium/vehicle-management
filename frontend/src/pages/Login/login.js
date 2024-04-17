
import loginApi from '../../api/loginApi';
import './styles.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [userList, setUserList] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // Sử dụng hook useNavigate để lấy hàm điều hướng

    useEffect(
        () => {
            async function fetchUser() {
                try {
                    const temp = await loginApi.getAll();
                    // console.log(temp);
                    setUserList(temp);
                } catch (error) {
                    console.error('Error fetching user list:', error);
                }
            };

            fetchUser();
        },
        []
    )
    
    const handleInputChange = (e) => {
        
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        for (let i = 0; i < userList.length; i++) {
            if(formData.username !== userList[i].username) continue;
            else if(formData.password !== userList[i].password) continue;
            else {
                navigate("/");
                return;
            }
        };
        setError(true);
    }

    return ( 
        <div className='login_container'>
            <form type='submit' className='formSubmit' onSubmit={handleSubmit}>
                <div className='box'>
                    <label className='formLabel'>Username</label>
                    <input type='text' className='formInput' name='username' placeholder='Your name' onChange={handleInputChange}></input>
                </div>

                <div className='box'>
                    <label className='formLabel'>Password</label>
                    <input type='password' className='formInput' name='password' placeholder='Your password' onChange={handleInputChange}></input>
                </div>

                {error && <span className='error'>Incorrect username or password!</span>}

                <button className='formButton'>Login</button>
            </form>
        </div>
       
    );
}

export default Login
