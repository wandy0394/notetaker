import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NoteList from './components/NoteList'


function App() {


  return (
      <div className='h-full w-screen'>
        <Routes>
          <Route path='/' element={<NoteList/>}/>
          <Route path='*' element={<Navigate to='/'/>}/>
        </Routes>
      </div>
  )
}



export default App
