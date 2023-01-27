import ReactSelect from 'react-select'
import {useMemo, useState} from 'react'
import { Tag} from '../types/NoteTypes'
import {Link} from 'react-router-dom'
import Header from './common/Header'
import EditTagsModal from './EditTagsModal'
import NoteCard, { SimpleNote } from './NoteCard'

type NoteListProps = {
    availableTags: Tag[]
    notes: SimpleNote[]
    updateTag: (id:string, label:string) => void
    deleteTag: (id:string) => void
}




export default function NoteList(props:NoteListProps) {
    const {availableTags, notes, updateTag, deleteTag} = props
    const [selectedTags, setSelectTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>('')
    const [open, setOpen] = useState<Boolean>(false)

    const filteredNotes = useMemo(()=>{
        return notes.filter(note=> {
            //(match titles or empty title) and (empty tags or
            //for every selected tag T, find all notes that have at least one tag t where T.id = t.id) 
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (selectedTags.length === 0 || selectedTags.every(tag=>note.tags.some(noteTag => noteTag.id === tag.id))) 
        })
    }, [title, selectedTags])

    const bodyStyle = {
        border:'solid',
        height:'100vh',
        display:'grid',
        // paddingTop:'2rem',
        paddingBottom:'2rem',
        gap:'2rem'
    }
    
    const searchSectionStyle = {
        // display:'grid', 
        // gridTemplateColumns:'1fr 1fr',
        // gridTemplateRows: '1fr 1fr',
        // gap: '2rem',
        // border:'solid',
        // width:'100%',
        // flexGrow:'1'
    }

    const buttonStyle = {

    }

    const noteListStyle = {
        display:'flex',
        flexWrap: 'wrap' as const,
        gap:'2rem',
        width:'100%',
        border:'solid',
        alignItems:'center',
    }




    return (
        <div className="h-full w-screen border border-solid border-black bg-gray-50 sm:h-screen">
            
            
            <Header 
                headerTitle='NoteTaker' 
                noteTitle={title} 
                onTitleChange={(e)=>setTitle(e)}
                availableTags={availableTags}
                selectedTags={selectedTags}
                onTagChange={e=>setSelectTags(e)}
                onEditClick={()=>setOpen(prev=>!prev)}
            >
            </Header>
          
            {/* <div>
                <button style={buttonStyle} onClick={()=>setOpen(prev=>!prev)}>Edit Tags</button>
            </div> */}
          
          
            <div className='flex flex-col gap-y-8 items-center w-full py-48 sm: gap-8 sm:p-24 sm:grid sm:grid-cols-2 md:grid-cols-3'>
                {
                    filteredNotes.map(note=>{
                        return (
                            <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                        )
                    })
                }
            </div>

          
            <EditTagsModal 
                open={open} 
                handleClose={()=>setOpen(false)} 
                availableTags={availableTags} 
                updateTag={updateTag} 
                deleteTag={deleteTag}
            />
        </div>
    )


}

