import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/pages/LandingPage';
import Dashboard from './components/pages/Dashboard'
import * as Constants from './constants/constants'
import ProtectedRoutes from './utils/ProtectedRoutes'


const App = () =>{

  return (
    <Router basename={Constants.BASENAME}>
      <Routes>
        <Route path={""} element={<LandingPage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path={Constants.DASHBOARD} element={<Dashboard/>}/>
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
