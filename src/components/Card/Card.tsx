import './Card.css'
import { RiDeleteBinFill, RiFileEditFill } from 'react-icons/ri'
import { useState } from 'react'
import { RowSchema } from '../../interfaces/schemas'

interface CardProps {
    cardData: RowSchema
    cardReturn: (id: string, type: 'Delete' | 'Update') => void
}
const Card = ({ cardData, cardReturn }: CardProps) => {
    const [clicked, setClicked] = useState(false)
    const fields = [
        { label: 'Age', prop: 'age' },
        { label: 'Gender', prop: 'gender' },
        { label: 'Country', prop: 'country_of_birth' },
        { label: 'Education', prop: 'education' },
        { label: 'Job', prop: 'job_title' },
        { label: 'Email', prop: 'email' },
        { label: 'User', prop: 'user_name' },
        { label: 'LinkedIn', prop: 'linkedin_skills' },
        { label: 'IP Address', prop: 'ip_address' },
    ]
    const renderedFields = fields.map((el)=>{
        return (
            <> 
                <div className='title'>{el.label}: </div>
                <div>{cardData[el.prop]}</div>
            </>
        )
    })
    return (
        <li key={cardData.id} className='Card' onClick={() => setClicked((prevState) => !prevState)}>
            <div className='title'>Name: </div>
            <div>{cardData.first_name + ' ' + cardData.last_name}</div>
            {renderedFields}
            {clicked && (
                <div className='card-buttons'>
                    <button onClick={() => cardReturn(cardData.id, 'Update')} className='action-button'>
                        <RiFileEditFill className='button-icon edit-icon' />{' '}
                    </button>
                    <button onClick={() => cardReturn(cardData.id, 'Delete')} className='action-button'>
                        <RiDeleteBinFill className='button-icon delete-icon' />{' '}
                    </button>
                </div>
            )}
        </li>
    )
}

export default Card
