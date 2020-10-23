import React, { useState } from 'react'
import './CreateUser.css'
import { auth, storage } from './firebase';
import { useHistory } from 'react-router-dom'

const CreateUser = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profile, setProfile] = useState('');

    const signUp = (e) => {
      e.preventDefault();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((auth) => {
            storage.ref('users/' + auth.user.uid + '/profile.jpg').put(profile)
            .then(function() {
                console.log('successfully upload')
            }) 
            if (auth) {
                history.push('/authenticated');
            }
        })
        .catch(error => alert(error.message));
    }

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setProfile(e.target.files[0]);
        }
    }

    // useEffect(() => {
    //     auth.onAuthStateChanged(user => {
    //         if(user) {
    //             storage.ref('users/' + user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
    //                 image.src = imgUrl;
    //             })
    //         }
    //     })
    // }, []);

    return (
        <div className='signUp'>
            <div className='signUp-form'>
                <form>
                <h2>Sign Up</h2>
                    <h5>Email</h5>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <input type='file' onChange={handleChange} />
                    <button type='submit' onClick={signUp}>Sign Up</button>
            </form>
          </div>
        </div>
    )
}

export default CreateUser
