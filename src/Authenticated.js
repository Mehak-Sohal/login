import React, { useEffect, useState } from 'react'
import './Authenticated.css'
import spinner from './spinner.gif';
import { auth, storage } from './firebase'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider'

const Authenticated = () => {
    const history = useHistory();
    const [{ user }] = useStateValue();
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
            history.push('/');
        }
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setLoading(true);
            if(user) {
                storage.ref(`users/${user.uid}/profile.jpg`)
                .getDownloadURL()
                .then(url => {
                    console.log(url)
                    setUrl(url);
                    setLoading(false);
                })
        }}
    )}, []);

    return (
        <div className='profile'>  
          <h3>Hello, {user?.email}</h3>
          {loading ? 
          <img src={spinner} alt="Loading.." className='image' /> : 
          <img src={url} alt='profile-image' className='image' /> }
        <button onClick={handleAuthentication} >Sign Out</button>
        </div>
    )
}

export default Authenticated
