import CreateableReactSelect from "react-select/creatable"
import { Link } from "react-router-dom"
import { FormEvent, useRef, useState } from "react"
import { NoteFormProps, Tag } from "../types/NoteTypes"



export default function NoteForm(props:NoteFormProps) {
    const {onSubmit} = props

    const formStyle = {
        fontSize:'2rem',
        display:'flex',
        flexDirection:'column' as const,
        gap:'2rem'
    }
    const buttonStyle = {
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center'
    }

    const titleRef=useRef<HTMLInputElement>(null)
    const markdownRef=useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectTags] = useState<Tag[]>([])

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSubmit({
            title:titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags:[]
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={formStyle}>
                <label>Title</label>
                <input required ref={titleRef}/>

                <label>Tags</label>
                <CreateableReactSelect 
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

                <label>Body</label>
                <textarea required ref={markdownRef}/>
            </div>
            <div style={buttonStyle}>
                <button type='submit'>Save</button>
                <Link to="..">
                    <button>Cancel</button>
                </Link>

            </div>
        </form>
    )
}