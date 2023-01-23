import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import NoteNew from './components/NoteNew'
import { RawNote, Tag, NoteData } from './types/NoteTypes'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useMemo } from 'react'
import {v4 as uuidV4} from 'uuid'

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesTagged = useMemo(()=>{
    return notes.map(note=>{
      return {
        ...note, 
        tags: tags.filter(tag=>note.tagIds.includes(tag.id))
      }
    })
  }, [notes, tags])


  function onNoteCreate({tags, ...data}: NoteData) {
    setNotes (prev=>{
      return [
        ...prev, 
        {...data, id:uuidV4(), tagIds:tags.map(tag=>tag.id)}
      ]
    })
  }

  return (
      <div>
        <Routes>
          <Route path='/' element={<h1>hi</h1>}></Route>
          <Route path='/:id'>
            <Route index element={<>Show</>}></Route>
            <Route path='edit' element={<>Edit</>}></Route>
          </Route>
          <Route path='/new' element={<NoteNew/>}></Route>
          <Route path='*' element={<Navigate to='/'/>}></Route>
        </Routes>
      </div>
  )
}



export default App
