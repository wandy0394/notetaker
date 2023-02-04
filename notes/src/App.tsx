import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NoteList from './components/NoteList'
import Register from './components/pages/Register'
import Login from './components/pages/Login'

function App() {


  return (
      <div className='h-full w-screen'>
        <Routes>
          <Route path='/' element={<NoteList/>}>
          </Route>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </div>
  )
}



export default App
