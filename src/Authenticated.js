import React, { useEffect } from 'react'
import './Authenticated.css'
import { auth, storage } from './firebase'
import { useHistory } from 'react-router-dom'
import { useStateValue } from './StateProvider'

const Authenticated = () => {
    const history = useHistory();
    const [{ user }] = useStateValue();

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
            history.push('/');
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
        <div className='profile'>  
          <h3>Hello, {user?.email}</h3>
           <div className='image' id='image'></div>
           <button onClick={handleAuthentication}>Sign Out</button>
        </div>
    )
}

export default Authenticated
