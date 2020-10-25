import * as _ from 'lodash';
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
import { WordItem, UserCredential, Mode } from './interfaces';
import db from './firebase';

function App() {
  const [words, setWords] = useState({});
  const [filter, setFilter] = useState('');
  const [mode, setMode] = useState(Mode.SHOW_ORIGINAL);
  const [userData, setUserData] = useState<UserCredential>(false);
  const [userDataReady, setUserDataReady] = useState(false);
  const [userDocumentId, setUserDocumentId] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  window.onresize = () => setScreenWidth(window.innerWidth);

  firebase.auth().onAuthStateChanged(function(user) {
    console.log('Set user data ready >>>>>>>>>>>>>>>>>>>>>>');
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
        setUserDocumentId(snapshot.docs[0].id);
        setWords(snapshot.docs[0].data().Words);
      }
      setUserDataReady(true);
    })();
  }, [userData])

  const context = {    
    words,
    filter,
    userData,
    mode,
    setMode: (mode: Mode) => setMode(mode),
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
    removeWord: (word: string) => {
      console.log('Removing word: ', word);
      const wordsExcluded = _.omit(words, word);
      setWords(wordsExcluded);
      db.collection('Users').doc(userDocumentId).update({
        Words: wordsExcluded
      });
    },
    setFilter: (pattern: string) => {
      console.log('Setting filter: ', pattern);
      setFilter(pattern);
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
        { userDataReady ?
          <UserContext.Provider value={context}>
            <Router>
              { screenWidth <= 960 ? <MobileNavMenu /> : <NavMenu /> }
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
          </UserContext.Provider> : <></>
        }
      </div>
    </div>
  );
}

export default App;
