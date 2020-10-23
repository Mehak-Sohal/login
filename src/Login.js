import React, { useState } from 'react'
import './Login.css'
import { auth } from './firebase';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'


const Login = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = (e) => {
        e.preventDefault();
        auth
        .signInWithEmailAndPassword(email, password)
        .then((auth) => {
            history.push('/authenticated');
        })
        .catch(error => alert(error.message));

    };

    return (
        <div className='signIn'>
            <div className='signIn-form'>
                
            <form>
            <h2>Sign In</h2>
                <h5>Email</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn}>Sign In</button>
                    <p>Don't have an account? 
                    <Link to='/createUser'> Sign Up</Link></p>
            </form>
           
            </div>
        </div>
    )
}

export default Login
