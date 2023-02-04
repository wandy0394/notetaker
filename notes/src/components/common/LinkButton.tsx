import {Link} from 'react-router-dom'

type Props = {
    to:string
    label:string
}
export default function LinkButton(props:Props) {


    return (
        <div className='rounded border-1 bg-blue-700 text-white px-2 py-1 align-middle hover:bg-blue-400'>
            <Link to={props.to}>{props.label}</Link>
        </div>
    )
}