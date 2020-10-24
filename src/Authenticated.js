import React, { useEffect, useState } from 'react'
import './Authenticated.css'
import { auth, storage } from './firebase'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider'

const Authenticated = () => {
    const history = useHistory();
    const [{ user }] = useStateValue();
    const [url, setUrl] = useState('');

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
            history.push('/');
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if(user) {
                storage.ref(`users/${user.uid}/profile.jpg`)
                .getDownloadURL()
                .then(url => {
                    console.log(url)
                    setUrl(url);
                })
        }}
    )}, []);

    return (
        <div className='profile'>  
          <h3>Hello, {user?.email}</h3>
          <img src={url} alt='profile-image' className='profile-image' />
        <button onClick={handleAuthentication} >Sign Out</button>
        </div>
    )
}

export default Authenticated
