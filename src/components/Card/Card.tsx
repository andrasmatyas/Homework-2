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
    return (
        <li key={cardData.id} className='Card' onClick={() => setClicked((prevState) => !prevState)}>
            <div className='title'>Name: </div>
            <div>{cardData.first_name + ' ' + cardData.last_name}</div>
            <div className='title'>Age: </div>
            <div>{cardData.age}</div>
            <div className='title'>Gender: </div>
            <div>{cardData.gender}</div>
            <div className='title'>Country: </div>
            <div>{cardData.country_of_birth}</div>
            <div className='title'>Education: </div>
            <div>{cardData.education}</div>
            <div className='title'>Job: </div>
            <div>{cardData.job_title}</div>
            <div className='title'>Email: </div>
            <div>{cardData.email}</div>
            <div className='title'>User Name: </div>
            <div>{cardData.user_name}</div>
            <div className='title'>Linkedin skills: </div>
            <div>{cardData.linkedin_skills}</div>
            <div className='title'>IP Address: </div>
            <div>{cardData.ip_address}</div>
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
