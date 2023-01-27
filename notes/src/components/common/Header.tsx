import { Link } from "react-router-dom"
import ReactSelect from "react-select"
import { Tag } from "../../types/NoteTypes"
import {HiPencil} from "react-icons/hi/"



type HeaderProps = {
    headerTitle:string
    noteTitle:string
    availableTags:Tag[]
    selectedTags:Tag[]
    onTitleChange: (value:string) => void
    onTagChange: (tags: Tag[]) => void
    onEditClick: ()=>void
    children?:any
}

export default function Header(props:HeaderProps) {
    const {headerTitle, availableTags, selectedTags, noteTitle, onTagChange, onTitleChange, onEditClick, children} = props
    return (
        <div className='fixed w-full flex flex-col bg-blue-100 gap-y-4 items-center justify-around py-4 px-10 md:gap-x-4 md:flex-row md:px-24'>
            <div className="w-full flex justify-between">
                <div className="text-4xl font-mono w-full font-bold md:w-auto md:text-5xl">
                    {headerTitle}
                </div>
                <div className="block sm:hidden text-gray-300 text-xl h-10 flex items-center justify-center">
                        |
                </div>
                <div className="block sm:hidden cursor-pointer w-9 h-9 flex items-end justify-center" onClick={onEditClick}>
                    <HiPencil size='24px' color="lightgray"/>
                </div>
                {/* <img className="block sm:hidden cursor-pointer w-8 h-9" onClick={onEditClick} src='/icons8-pencil-90.png'/> */}
                
            </div>
            <div className="h-full flex flex-col w-full gap-y-4 md:flex-row md:gap-x-4 md:items-center">
                <div className='h-10 w-full flex items:start'>
                    <input 
                        className='px-3 h-10 w-full bg-transparent focus:outline-none border-b border-solid border-gray-400 focus:border-blue-500'
                        placeholder="Search notes.." 
                        value={noteTitle} 
                        onChange={e=>onTitleChange(e.target.value)}
                    />
                    <div className="text-gray-300 text-xl h-10 flex items-center justify-center">
                        |
                    </div>
                    <div className="text-gray-300 text-3xl w-9 h-10 flex items-center justify-center hover:text-gray-500 hover:cursor-default">
                        <Link to='/new' className='hover:cursor-default'>
                            +
                        </Link>
                    </div>
                    
                </div>
                <ReactSelect
                    styles={{
                        container:(baseStyles, state) => ({
                            ...baseStyles,
                            width:'100%',
                            height:'50%',
                            
                        }),
                        control:styles=>({
                            ...styles,
                            backgroundColor:'transparent',
                            border:'none',
                        }),
                    }}
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
                            onTagChange(tags.map(tag=>{
                                return {label:tag.label, id:tag.value}
                            }))
                        }
                    }
                    placeholder='Select Tags...'
                />
                <div className="hidden cursor-pointer w-9 h-9 flex items-center justify-center sm:flex" onClick={onEditClick}>
                    <HiPencil size='24px' color="lightgray"/>
                </div>
            </div>
        </div>
    )
}