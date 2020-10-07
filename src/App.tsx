import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import NavMenu from './NavBar';
import MobileNavMenu from './MobileNavBar';
import Vocabulary from './pages/Vocabulary';
import Training from './pages/Training';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import SignIn from './pages/SignIn';
import Error from './pages/Error';
import { UserContext } from './UserContext';
import './App.css';
import { WordItem, UserCredential } from './interfaces';
import db from './firebase';

function App() {
  const [words, setWords] = useState({});
  const [userData, setUserData] = useState<UserCredential>(false);
  const [userDataReady, setUserDataReady] = useState(false);
  const [userDocumentId, setUserDocumentId] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  window.onresize = () => setScreenWidth(window.innerWidth);

  firebase.auth().onAuthStateChanged(function(user) {
    setUserDataReady(true);
    setUserData(user!);
  });

  useEffect(() => {
    (async () => {
      if (!userData) {
        return;
      }
      const userId = (userData as {uid: string}).uid!;
      console.log('User data uid:');
      console.log(userId);
      const snapshot = await db.collection('Users').where('userId', '==', userId).get();


      (window as any).db = db;

      if (!snapshot.docs.length) {
        db.collection('Users').add({
          userId,
          Words: {}
        });
      } else {
        //console.log('Docs:');
        setUserDocumentId(snapshot.docs[0].id);
        setWords(snapshot.docs[0].data().Words);
      }
    })();
    // db.collection('Words').onSnapshot(snapshot => {
    //   setWords(snapshot.docs.reduce((result, doc) => {
    //     const data = doc.data();
    //     console.log(data);
    //     return {
    //       ...result,
    //       [data.spelling]: {
    //         id: doc.id,
    //         translation: data.translation,
    //         progress: data.progress
    //       }
    //     };
    //   },  {}));
    // });
  }, [userData])

  const context = {    
    words,
    userData,
    pushWord: (word: string, translation: string) => {
      setWords({
        ...words,
        [word]: {
          translation,
          progress: 0
        }
      });
      db.collection('Users').doc(userDocumentId).update({
        [`Words.${word}`]: {
          translation,
          progress: 0
        }
      });
    },
    updateWord: (word: string, data: WordItem) => {
      setWords({
        ...words,
        [word]: data
      });
      db.collection('Users').doc(userDocumentId).update({
        [`Words.${word}.progress`]: data.progress
      });
    }
  }

  return (
    <div className="wrapper">
      <div className="App">
        <UserContext.Provider value={context}>
          <Router>
            { screenWidth <= 960 ? <MobileNavMenu /> : <NavMenu /> }
            <div className="contentArea">
              { userDataReady ?
                  (
                    <Switch>
                      <Route path='/' exact component={SignIn} />
                      <Route path='/vocabulary' exact component={Vocabulary} />
                      <Route path='/training' exact component={Training} />
                      <Route path='/settings' exact component={Settings} />
                      <Route path='/stats' exact component={Stats} />
                      <Route component={Error} />
                    </Switch>
                  ) : (<></>)
              }

            </div>
          </Router>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
