import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavMenu from './NavBar';
import Vocabulary from './pages/Vocabulary';
import Training from './pages/Training';
import Settings from './pages/Settings';
import Stats from './pages/Stats';
import Error from './pages/Error';
import { UserContext, defaultContext } from './UserContext';
import './App.css';
import { WordItem } from './interfaces';

function App() {
  const [words, setWords] = useState(defaultContext.words);
  const context = {    
    words,
    pushWord: (word: string, translation: string) =>
      setWords({
        ...words,
        [word]: {
          translation,
          progress: 0
        }
      }),
    updateWord: (word: string, data: WordItem) =>
      setWords({
        ...words,
        [word]: data
      })
  }

  return (
    <div className="wrapper">
      <div className="App">
        <UserContext.Provider value={context}>
          <Router>
            <NavMenu />
            <Switch>
              <Route path='/vocabulary' exact component={Vocabulary} />
              <Route path='/training' exact component={Training} />
              <Route path='/settings' exact component={Settings} />
              <Route path='/stats' exact component={Stats} />
              <Route component={Error} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default App;
