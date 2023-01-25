import ReactSelect from 'react-select'
import {useMemo, useState} from 'react'
import { RawNote, Tag, Note } from '../types/NoteTypes'
import {Link} from 'react-router-dom'

type NoteListProps = {
    availableTags: Tag[]
    notes: SimpleNote[]
}


type SimpleNote = {
    tags: Tag[]
    title: string
    id: string
}
function NoteCard({id, title, tags}:SimpleNote) {
    const noteStyle = {
        minWidth:'300px',
        minHeight:'150px',
        height:'20vh',
        width:'40vh',
        border:'1px solid',
        borderRadius:'8px',
        boxShadow:'0 4px',
        display:'flex',
        flexDirection:'column' as const
    }
    return (
            <Link to={`/${id}`}>
                <div style={noteStyle}>
                    <div>{title}</div>
                    <div>
                        {
                            tags.map((tag)=>{
                                return tag.label
                            })
                        }
                    </div>
                </div>
            </Link>
    )
}

export default function NoteList(props:NoteListProps) {
    const {availableTags, notes} = props
    const [selectedTags, setSelectTags] = useState<Tag[]>([])
    const [title, setTitle] = useState<string>('')


    const filteredNotes = useMemo(()=>{
        return notes.filter(note=> {
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
                && (selectedTags.length === 0 || selectedTags.every(tag=>note.tags.some(noteTag=> noteTag.id === tag.id)))
            
        })
    }, [title, selectedTags])

    const bodyStyle = {
        border:'solid',
        height:'100vh',
        display:'grid',
        paddingTop:'2rem',
        paddingBottom:'2rem',
        gap:'2rem'
    }
    
    const searchSectionStyle = {
        display:'grid', 
        gridTemplateColumns:'1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '2rem',
        border:'solid',
        width:'100%',
        flexGrow:'1'
    }

    const titleStyle = {
        fontSize:'4rem',
        fontFamily:'Helvetica'
    }

    const buttonStyle = {

    }

    const buttonsStyle = {

    }
    const noteListStyle = {
        display:'flex',
        flexWrap: 'wrap' as const,
        gap:'2rem',
        width:'100%',
        border:'solid',
        alignItems:'center',
    }

    const noteStyle = {
        minWidth:'300px',
        minHeight:'150px',
        height:'20vh',
        width:'40vh',
        border:'1px solid',
        borderRadius:'8px',
        boxShadow:'0 4px',
        display:'flex',
        flexDirection:'column' as const
    }

    const sectionStyle = {
        paddingLeft:'3rem',
        paddingRight:'3rem',
    }

    return (
        <div style={bodyStyle}>
            <div style={sectionStyle}>
                <div style={searchSectionStyle}>
                    <div style={titleStyle}>
                        All Notes
                    </div>
                    <div>
                        <button style={buttonStyle}>Create</button>
                        <button style={buttonStyle}>Edit Tags</button>
                    </div>
                    <form>
                        <div style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
                            <label>Title</label>
                            <input placeholder="search.." value={title} onChange={e=>setTitle(e.target.value)}></input>
                        </div>
                    </form>
                    <div style={{display:'flex', flexDirection:'column', gap:'2rem'}}>
                        <label>Tags</label>
                        <ReactSelect

                            options={availableTags.map(tag=>{
                                return {
                                    label:tag.label,
                                    value:tag.id
                                }
                            })}
                            isMulti 
                            value={
                                selectedTags.map(tag=> {
                                    return {label: tag.label, value: tag.id}
                                })
                            }
                            onChange = {
                                tags => {
                                    setSelectTags(tags.map(tag=>{
                                        return {label:tag.label, id:tag.value}
                                    }))
                                }
                            }
                        />
                    </div>
                </div>
            </div>
            <div style={sectionStyle}>
                <div style={noteListStyle}>
                    {
                        filteredNotes.map(note=>{
                            return (
                                <NoteCard id={note.id} title={note.title} tags={note.tags}/>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )


}