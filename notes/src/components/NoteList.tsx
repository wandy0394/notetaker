import ReactSelect from 'react-select'
import {useState} from 'react'
import { RawNote, Tag } from '../types/NoteTypes'

type NoteListProps = {
    availableTags: Tag[]
    notes: RawNote[]
}

export default function NoteList(props:NoteListProps) {
    const {availableTags, notes} = props
    const [selectedTags, setSelectTags] = useState<Tag[]>([])


    const bodyStyle = {
        border:'solid',
        height:'100vh',
        display:'grid',
        // gridTemplateRows:'1fr',
        // gridAutoRows:'1fr',
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
        alignItems:'center'
    }

    const noteStyle = {
        minWidth:'300px',
        minHeight:'150px',
        height:'20vh',
        width:'40vh',
        border:'1px solid',
        borderRadius:'4px',
        boxShadow:'10px',
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
                            <input placeholder="search.."></input>
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
                        notes.map(note=>{
                            return (
                                <div style={noteStyle}>
                                    <div>{note.title}</div>
                                    <div>{note.markdown}</div>
                                    <div>{note.id}</div>
                                    <div>{note.tagIds}</div>
                                </div>
                            )
                        })
                    }
                    <div style={noteStyle}>Note1</div>
                    <div style={noteStyle}>Note1</div>
                    <div style={noteStyle}>Note1</div>
                    <div style={noteStyle}>Note1</div>
                    <div style={noteStyle}>Note1</div>
                    <div style={noteStyle}>Note1</div>
                </div>

            </div>
        </div>
    )


}