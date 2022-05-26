import { createPortal } from "react-dom";
import { useState } from "react";
import {RowSchema} from '../../App';
import Button from '../Button/Button';
import'./Dialog.css';

interface dialogProps{
    type: 'Delete'|'Update'|'Create'|'',
    data: RowSchema,
    cancel: () => void,
    handle: (data: RowSchema) => void,
}
const Dialog = ({type, data, cancel, handle}:dialogProps) => {
    const [firstName, setFirstName] = useState(data.first_name)
    const [lastName, setLastName] = useState(data.last_name)
    const [age, setAge] = useState(data.age)
    const [gender, setGender] = useState(data.gender)
    const [country, setCountry] = useState(data.country_of_birth)
    const [education, setEducation] = useState(data.education)
    const [job, setJob] = useState(data.job_title)
    const [email, setEmail] = useState(data.email)
    const [user, setUser] = useState(data.user_name)
    const [linkedin, setLinkedin] = useState(data.linkedin_skills)
    const [ip, setIp] = useState(data.ip_address)

    const buttonType = {
      Delete: 'danger',
      Update: 'primary',
      Create: 'primary'
    }

    const generateObject = () => {
        return {
            id: data.id,
            first_name: firstName,
            last_name: lastName,
            age: age,
            gender: gender,
            country_of_birth: country,
            education: education,
            job_title: job,
            email: email,
            user_name: user,
            linkedin_skills: linkedin,
            ip_address: ip
        }
    }
    const generateContent = () => {
      if (type === 'Delete') {
        return <p className="dialog-delete">Are you sure you want to delete this entry?</p>
      }
      return <div className="dialog-input">
        <label>First Name:
          <input type="text" value={firstName}
            onChange={(e) => setFirstName((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>Last Name:
          <input type="text" value={lastName}
            onChange={(e) => setLastName((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>Age:
          <input type="number" value={age}
            onChange={(e) => setAge(parseInt((e.target as HTMLInputElement).value))}
          ></input>
        </label>
        <label>Gender:
          <input type="text" value={gender}
            onChange={(e) => setGender((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>Country:
          <input type="text" value={country}
            onChange={(e) => setCountry((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>Education:
          <input type="text" value={education}
            onChange={(e) => setEducation((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>Job:
          <input type="text" value={job}
            onChange={(e) => setJob((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>Email:
          <input type="email" value={email}
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>User:
          <input type="text" value={user}
            onChange={(e) => setUser((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>Linkedin:
          <input type="text" value={linkedin}
            onChange={(e) => setLinkedin((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>IP Adress:
          <input type="text" value={ip}
            onChange={(e) => setIp((e.target as HTMLInputElement).value)}
          ></input>
        </label>
      </div>
    }
    return createPortal(<div className='dialog-container'>
      <div className="dialog-content">
      {generateContent()}
      <div className='dialog-buttons'>
        <Button type={type === 'Delete' ? 'danger' : 'primary'} label={type} action={()=>handle(generateObject())}/>
        <Button type='secondary' label='Cancel' action={()=>cancel()}/>
      </div>
      </div>
      </div>
    , document.getElementById('root') as HTMLElement)
}

export default Dialog