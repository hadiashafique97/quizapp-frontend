// all my imports 
import 'antd/dist/reset.css' // importing the antdesign api 

//importing my css instead of using bootstrap i created some properties inside my css that i could just assign to style my different components
import '../src/styles/App.css'
import '../src/styles/colors.css'
import '../src/styles/text.css'
import '../src/styles/structure.css'
import '../src/styles/custom-styles.css'
import '../src/styles/formstyles.css'
import '../src/styles/layout.css'
//importing my variables 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // setting up the routes 
// two different routes login and register 
import Login from './pages/common/login/login-index'
import Register from './pages/common/register/register-index'
import ProtectedRoute from './Components/ProtectedRoute'
import Home from './pages/common/Home/Home-index'
import Tests from './pages/admin/Tests/Test'
import CreateEditTest from './pages/admin/Tests/CreateEditTest'
import Spinner from './Components/Spinner'
import { useSelector } from 'react-redux'
import WriteTest from './pages/user/WriteTest/WriteTest-index'



function App() {
  const { loading } = useSelector(state => state.loader)

  return (
    <>
      {loading && <Spinner />}
      <Router>
        <Routes>
     //every one
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
       //user routes
          <Route path="/" element={<ProtectedRoute>
            <Home />
          </ProtectedRoute>
          }
          />
          <Route path="/user/write-test/:id" element={<ProtectedRoute>
            <WriteTest />
          </ProtectedRoute>
          }
          />

    //admin routes

          <Route path="/admin/tests" element={<ProtectedRoute>
            <Tests />
          </ProtectedRoute>
          }
          />
          <Route path="/admin/tests/add" element={<ProtectedRoute>
            <CreateEditTest />
          </ProtectedRoute>
          }
          />
          <Route path="/admin/tests/edit/:id" element={<ProtectedRoute>
            <CreateEditTest />
          </ProtectedRoute>
          }
          />


        </Routes>
      </Router>
    </>
  )
}

export default App;
