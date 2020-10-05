import React, { useEffect } from 'react'
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';

export default function Stats() {
    useEffect(() => {
        firebase.auth().signOut();
    }, []);
    return (
        <Redirect to='/' />
    )
}
