import React from 'react'
import firebase from 'firebase';
import { auth, provider } from '../firebase';
import { Button } from '@material-ui/core';
import { UserContextData } from '../interfaces';
import { UserContext } from '../UserContext';
import { Redirect } from 'react-router-dom';

export default function SignIn() {
    return (
        <UserContext.Consumer>
            {(value: UserContextData) => (
                <SignInWithContext context={value} />
            )}
        </UserContext.Consumer>
    )
}

function SignInWithContext({ context }: {context: UserContextData}) {

    const handleSignIn = () =>
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => auth.signInWithPopup(provider));

    return !context.userData ? (
        <div className="signInWrapper">
            <Button variant="contained" size="large" color="primary" className="signInButton" onClick={handleSignIn}>
                Sign in with Google account
            </Button>
        </div>
    ) : (<Redirect to='/vocabulary' />);
}



