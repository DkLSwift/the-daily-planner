import './App.css';
import React, {useState} from 'react'
import { Header, Main } from './components'

import GlobalState from './context/global-state'

function App() {

    const roasterStr = "lost-ark-roaster-tracker"
    const localRoaster = JSON.parse(localStorage.getItem(roasterStr))
    const [state, setState] = useState(localRoaster !== null ? localRoaster : [])

  return (
    <>
      <GlobalState.Provider value={[state, setState]}>
        <Header/>
        <Main/>
      </GlobalState.Provider>
    </>
  );
}

export default App;
