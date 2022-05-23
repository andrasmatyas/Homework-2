import {RowSchema} from '../../App'
import './Card.css'

interface CardProps {
    cardData: RowSchema,
    cardReturn: (id: string, type: 'del'|'upd') => void
}
const Card = ({cardData, cardReturn}:CardProps) => {
  return (
    <li key={cardData.id} className='Card'>
    <div className='title'>Name: </div>
    <div>{cardData.first_name +' '+cardData.last_name}</div>
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
    <button onClick={()=>cardReturn(cardData.id, 'del')}>Delete</button>
    <button onClick={()=>cardReturn(cardData.id, 'upd')}>Update</button>
  </li>
  )
}

export default Card