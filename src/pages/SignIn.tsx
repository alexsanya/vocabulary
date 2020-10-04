import React from 'react'
import { auth, provider } from '../firebase';
import { Button } from '@material-ui/core';
import { UserContextData, OnSignInFunction } from '../interfaces';
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

    const handleSignIn = async (onSignIn: OnSignInFunction) => {
        const userData = await auth.signInWithPopup(provider);
        console.log(userData);
        onSignIn(userData);
    }

    return !context.userData ? (
        <div className="signInWrapper">
            <Button variant="contained" size="large" color="primary" className="signInButton" onClick={() => handleSignIn(context.onSignIn)}>
                Sign in with Google account
            </Button>
        </div>
    ) : (<Redirect to='/vocabulary' />);
}



