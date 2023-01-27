import { Tag } from "../types/NoteTypes"

type EditTagsModalProps = {
    open: Boolean
    handleClose:()=>void
    availableTags: Tag[]
    updateTag: (id:string, label:string) => void
    deleteTag: (id:string) => void
}

export default function EditTagsModal(props:EditTagsModalProps) {
    const {open, handleClose, availableTags, updateTag, deleteTag} = props
    const modalStyle = {
        display: open?'block':'none',
        position: 'fixed' as const,
        zIndex: '1',
        left: '25%',
        top: '25%',
        width: '50%',
        height: '50%',
        overflow: 'auto', 
        backgroundColor: 'rgb(255,255,255)',
        border:'solid'
    }
    return (
        <div style={modalStyle}>
            Edit Tags
            <div style={{display:'flex', flexDirection:'column'}}>
                <form>
                    <div style={{display:'flex', flexDirection:'column'}}>
                        {
                            availableTags.map(tag=>{
                                return (
                                    <div>
                                        <input defaultValue={tag.label} onChange={(e)=>updateTag(tag.id, e.target.value)}/>
                                        <button onClick={()=>deleteTag(tag.id)} >X</button>
                                    </div>)
                            })
                        }

                    </div>
                </form>
                <div>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    )
}