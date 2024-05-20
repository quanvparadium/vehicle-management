import Cookies from "js-cookie";

import axiosClient from "../../api/axiosClient";
import "./styles.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setLogin }) {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate(); // Sử dụng hook useNavigate để lấy hàm điều hướng

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username: formData.username,
            password: formData.password,
        };
        await axiosClient
            .post("/auth/login", payload)
            .then(async (result) => {
                await Promise.all([
                    Cookies.set("token", result.result.access_token),
                    Cookies.set("login", true),
                ]);
                setLogin(true);
                navigate("/home");
            })
            .catch((error) => {
                console.log("result", error);
                setError(true);
            });
    };

    return (
        <div className="login_container">
            <form type="submit" className="formSubmit" onSubmit={handleSubmit}>
                <div className="box">
                    <label className="formLabel">Username</label>
                    <input
                        type="text"
                        className="formInput"
                        name="username"
                        placeholder="Your name"
                        onChange={handleInputChange}
                    ></input>
                </div>

                <div className="box">
                    <label className="formLabel">Password</label>
                    <input
                        type="password"
                        className="formInput"
                        name="password"
                        placeholder="Your password"
                        onChange={handleInputChange}
                    ></input>
                </div>

                {error && (
                    <span className="error">
                        Incorrect username or password!
                    </span>
                )}

                <button className="formButton">Login</button>
            </form>
        </div>
    );
}

export default Login;
