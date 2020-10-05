import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import NavMenu from './NavBar';
import Vocabulary from './pages/Vocabulary';
import Training from './pages/Training';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import SignIn from './pages/SignIn';
import Error from './pages/Error';
import { UserContext } from './UserContext';
import './App.css';
import { WordItem, UserCredential, WordsList } from './interfaces';
import db from './firebase';

function App() {
  const [words, setWords] = useState({});
  const [userData, setUserData] = useState<UserCredential>(false);

  firebase.auth().onAuthStateChanged(function(user) {
    console.log('Auth state changed');
    console.log(user);
    setUserData(user!);
  });

  const onSignIn = (userData: UserCredential) => {
    setUserData(userData);
  };

  useEffect(() => {
    if (!userData) {
      return;
    }
    db.collection('Words').onSnapshot(snapshot => {
      setWords(snapshot.docs.reduce((result, doc) => {
        const data = doc.data();
        console.log(data);
        return {
          ...result,
          [data.spelling]: {
            id: doc.id,
            translation: data.translation,
            progress: data.progress
          }
        };
      },  {}));
    });
  }, [userData])

  const context = {    
    words,
    onSignIn,
    userData,
    pushWord: (word: string, translation: string) => {
      setWords({
        ...words,
        [word]: {
          translation,
          progress: 0
        }
      });
      db.collection('Words').add({
        spelling: word,
        translation,
        progress: 0
      });
    },
    updateWord: (word: string, data: WordItem) => {
      setWords({
        ...words,
        [word]: data
      });
      const docId = (words as WordsList)[word].id;
      db.collection('Words').doc(docId).update({
        progress: data.progress
      });
    }
  }

  return (
    <div className="wrapper">
      <div className="App">
        <UserContext.Provider value={context}>
          <Router>
            <NavMenu />
            <div className="contentArea">
              <Switch>
                <Route path='/' exact component={SignIn} />
                <Route path='/vocabulary' exact component={Vocabulary} />
                <Route path='/training' exact component={Training} />
                <Route path='/settings' exact component={Settings} />
                <Route path='/stats' exact component={Stats} />
                <Route component={Error} />
              </Switch>
            </div>
          </Router>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
