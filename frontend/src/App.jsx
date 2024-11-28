import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage'
import * as Constants from './constants/constants'

const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path={Constants.LANDING_PAGE} element={<LandingPage/>}/>
        <Route path={Constants.HOME_PAGE} element={<LandingPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;
