

import './styles.css'
import { useEffect } from 'react';

// var user = "http://localhost:3000/user"
// fetch(user) 
//     .then( function(response) {
//         return response.json();
//     })
//     .then( function(request) {
//         console.log(request);
//     })

function Login() {
    return ( 
        <div >
            <h1 style={{marginTop: '100px', fontWeight: 'bold'}}>LOGIN</h1>

            <form id="box">
                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <label>Username</label>
                    <input type='text' placeholder='Your name'></input>
                </div>

                <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <label>Password</label>
                    <input type='text' placeholder='Your password'></input>
                </div>

                <input type='submit' value={'Login'}></input>
            </form>
        </div>
       
    );
}

export default Login
