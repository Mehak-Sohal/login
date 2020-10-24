import React, { useState, useEffect } from 'react'
import './CreateUser.css'
import { auth, storage } from './firebase';
import { useHistory } from 'react-router-dom'

const CreateUser = () => {
    const history = useHistory();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    
    const signUp = (e) => {
      e.preventDefault();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            storage.ref(`users/${auth.user.uid}/profile.jpg`).put(image)
            .then(function() {
               console.log('successfully upload')
               if (auth) {
                history.push('/authenticated');
            }
            })     
        })
        .catch(error => alert(error.message));
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    return (
        <div className='signUp'>
            <div className='signUp-form'>
                <form>
                <h2>Sign Up</h2>
                    <h5>Email</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} required/>
                    <input type='file' onChange={handleChange} required />
                    <button type='submit' onClick={signUp}>Sign Up</button>
            </form>
          </div>
        </div>
    )
}

export default CreateUser
