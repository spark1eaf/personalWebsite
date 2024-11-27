import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage'
const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path='/site' element={<LandingPage/>}/>
      </Routes>
    </Router>
  )
}
export default App;
