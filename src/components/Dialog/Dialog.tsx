import { createPortal } from 'react-dom'
import { useState } from 'react'

import Button from '../Button/Button'
import './Dialog.css'
import { RowSchema } from '../../interfaces/schemas'

interface dialogProps {
    type: 'Delete' | 'Update' | 'Create' | ''
    data: RowSchema
    cancel: () => void
    handle: (data: RowSchema) => void
}
const Dialog = ({ type, data, cancel, handle }: dialogProps) => {
    const generateObject = () => {
        return {
            id: data.id,
            first_name: inputData.firstName,
            last_name: inputData.lastName,
            age: inputData.age,
            gender: inputData.gender,
            country_of_birth: inputData.country,
            education: inputData.education,
            job_title: inputData.job,
            email: inputData.email,
            user_name: inputData.user,
            linkedin_skills: inputData.linkedin,
            ip_address: inputData.ip,
        }
    }

    const [inputData, setInputData] = useState({
        firstName: data.first_name,
        lastName: data.last_name,
        age: data.age,
        gender: data.gender,
        country: data.country_of_birth,
        education: data.education,
        job: data.job_title,
        email: data.email,
        user: data.user_name,
        linkedin: data.linkedin_skills,
        ip: data.ip_address,
    })
    const inputFields = [
        { label: 'First Name', type: 'text', prop: 'firstName' },
        { label: 'Last Name', type: 'text', prop: 'lastName' },
        { label: 'Age', type: 'number', prop: 'age' },
        { label: 'Gender', type: 'text', prop: 'gender' },
        { label: 'Country', type: 'text', prop: 'country' },
        { label: 'Education', type: 'text', prop: 'education' },
        { label: 'Job', type: 'text', prop: 'job' },
        { label: 'Email', type: 'email', prop: 'email' },
        { label: 'User', type: 'text', prop: 'user' },
        { label: 'LinkedIn', type: 'text', prop: 'linkedin' },
        { label: 'IP Address', type: 'text', prop: 'ip' },
    ]

    const generateInputs = inputFields.map((el) => {
        return (
            <label>
                {el.label}:
                <input
                    type={el.type}
                    value={inputData[el.prop]}
                    onChange={(e) =>
                        setInputData((prevState) => {
                            return {
                                ...prevState,
                                [el.prop]:
                                    el.prop === 'number'
                                        ? parseInt((e.target as HTMLInputElement).value)
                                        : (e.target as HTMLInputElement).value,
                            }
                        })
                    }
                />
            </label>
        )
    })

    const generateContent = () => {
        if (type === 'Delete') {
            return <p className='dialog-delete'>Are you sure you want to delete this entry?</p>
        }

        return <div className='dialog-input'>{generateInputs}</div>
    }
    return createPortal(
        <div className='dialog-container'>
            <div className='dialog-content'>
                {generateContent()}
                <div className='dialog-buttons'>
                    <Button
                        type={type === 'Delete' ? 'danger' : 'primary'}
                        label={type}
                        action={() => handle(generateObject())}
                    />
                    <Button type='secondary' label='Cancel' action={() => cancel()} />
                </div>
            </div>
        </div>,
        document.getElementById('root') as HTMLElement
    )
}

export default Dialog
