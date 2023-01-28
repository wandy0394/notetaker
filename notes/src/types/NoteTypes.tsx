export type Note = {
    id: string
} & NoteData

export type NoteData = {
    title: string
    markdown: string
    tags: Tag[]
}

export type Tag = {
    id: string
    label: string
}

export type NoteFormProps = {
    onSubmit: Function
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<NoteData>

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
    title: string
    markdown: string
    tagIds: string[]
}

export type EditNoteProps = {
    id:string,
    title:string,
    markdown:string,
    tagIds:string[],
    tags:Tag[]
}
