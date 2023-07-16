import {Route, Routes} from 'react-router-dom'
import axios from 'axios'

import './App.css'
import Layout from './Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AccountPage from './pages/AccountPage'
import { UserContextProvider } from './UserContext'
import PlaceForm from './components/PlaceForm'
import PlacesPage from './pages/PlacesPage'
import {SinglePlace} from './pages/Places'

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/places/:id' element={<SinglePlace/>}/>
          <Route path='/account' element={<AccountPage/>}>
            <Route index element= {<PlacesPage/>}/>
            <Route path='/account/places/new' element={<PlaceForm/>} />
            <Route path='/account/places/:id' element={<PlaceForm/>} />
            <Route path='/account/places' element={<PlacesPage/>} />
            <Route path='/account/:subpage?' element={<PlaceForm/>} />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>   
  )
}

export default App
