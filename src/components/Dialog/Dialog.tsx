import { createPortal } from "react-dom";
import {RowSchema} from '../../App'
import Button from '../Button/Button'

interface dialogProps{
    type: 'del'|'upd'|'new'|'',
    data: RowSchema,
    cancel: () => void,
    handle: (data: RowSchema) => void,
}
const Dialog = ({type, data, cancel, handle}:dialogProps) => {
    return createPortal(<div>
    <div>ID: {data.id}</div>
    <div>Age: {data.age}</div>
    <div>Type: {type}</div>
    <Button type='danger' label='Action' action={()=>handle(data)}/>
    <Button type='secondary' label='Cancel' action={()=>cancel()}/>
    </div>
    , document.getElementById('root') as HTMLElement)
}

export default Dialog