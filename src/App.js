// all my imports 
import 'antd/dist/reset.css' // importing the antdesign api 

//importing my css instead of using bootstrap i created some properties inside my css that i could just assign to style my different components
import '../src/styles/App.css'
import '../src/styles/colors.css'
import '../src/styles/text.css'
import '../src/styles/structure.css'
import'../src/styles/custom-styles.css'
import '../src/styles/formstyles.css'

//importing my variables 
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom' // setting up the routes 
// two different routes login and register 
import Login from './pages/common/login'
import Register from './pages/common/register'




function App() {
  return (
    <Router>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </Router>
  )
}

export default App;
