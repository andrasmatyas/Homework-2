import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import './App.css';
import savedData from './data/users.json';
import Card from './components/Card/Card';
import Button from './components/Button/Button';
import Dialog from './components/Dialog/Dialog';
import Scroll from './components/Scroll/Scroll';

export interface RowSchema {
  id: string,
  first_name: string,
  last_name: string,
  age: number,
  gender: string,
  country_of_birth: string,
  education: string,
  job_title: string,
  email: string,
  user_name: string,
  linkedin_skills: string,
  ip_address: string
}

function App() {
  const initRow = {
    first_name: '',
    last_name: '',
    age: 0,
    gender: '',
    country_of_birth: '',
    education: '',
    job_title: '',
    email: '',
    user_name: '',
    linkedin_skills: '',
    ip_address: ''
  }
  const [data, setData] = useState<RowSchema[]>([])
  const [filteredData, setFilteredData] = useState<RowSchema[]>([])
  const [maleCheck, setMaleCheck] = useState(true)
  const [femaleCheck, setFemaleCheck] = useState(true)
  const [searchValue, setSearchValue] = useState('')
  const [dialogType, setDialogType] = useState<'Delete'|'Update'|'Create'|''>('')
  const [dialogData, setDialogData] = useState<RowSchema>({id:'', ...initRow})

useEffect(() => {
  setData(savedData)
  //const fetchData = async () =>  {
  //  const response = await axios.get('https://my.api.mockaroo.com/api/users?key=10d78d90')
    //setData(response.data)
  //}
  //fetchData()
}, []);

useEffect(() => {
  data && setFilteredData(data)
}, [data])

useEffect(() => {
  if (maleCheck && femaleCheck) {
    const searchData = data.filter( (row: RowSchema) => row.first_name.toLowerCase().includes(searchValue.toLocaleLowerCase()) || row.last_name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    setFilteredData(searchData)
  }
  if (maleCheck && !femaleCheck) {
    const maleData = data.filter( (row: RowSchema) => row.gender.toLowerCase() === 'male' && 
    (row.first_name.toLowerCase().includes(searchValue.toLocaleLowerCase()) || row.last_name.toLowerCase().includes(searchValue.toLocaleLowerCase())))
    setFilteredData(maleData)
  }
  if (!maleCheck && femaleCheck) {
    const femaleData = data.filter( (row: RowSchema) => row.gender.toLowerCase() === 'female' &&
    (row.first_name.toLowerCase().includes(searchValue.toLocaleLowerCase()) || row.last_name.toLowerCase().includes(searchValue.toLocaleLowerCase())))
    setFilteredData(femaleData)
  }
  if (!maleCheck && !femaleCheck){
      setFilteredData([])
  }
}, [maleCheck, femaleCheck, searchValue, data])

useEffect(() => {
  console.log(dialogType)
}, [dialogType])


const handleMaleCheck = () => {
  setMaleCheck((prevState => !prevState));
};
const handleFemaleCheck = () => {
  setFemaleCheck((prevState => !prevState));
};

const newAction = () => {
  setDialogType('Create')
  setDialogData(dialogData=>({id:uuidv4(), ...initRow}))
}

const cardAction = (id:string, type:'Delete'|'Update') => {
  setDialogType(type)
  if (type==='Delete') {setDialogData(dialogData=>({id: id, ...initRow}))}
  if (type==='Update') {
    const updRow = data.filter((row)=>{return row.id === id})
    setDialogData(dialogData => updRow[0])
  }
}

const dialogAction = (newRow: RowSchema) => {
  switch (dialogType) {
    case 'Delete':
      const delData = data.filter((row: RowSchema)=>{return row.id !== newRow.id})
      setData(delData)
      setDialogType('')
      setDialogData({id:'', ...initRow})
      break;
    case 'Update':
      const updData = data.map((row: RowSchema)=>{
        if (row.id === newRow.id) {
          return newRow
        }
        return row
      })
      setData(updData)
      setDialogType('')
      setDialogData({id:'', ...initRow})
      break;
    case 'Create':
      const creData = [...data]
      creData.unshift(newRow)
      setData(creData)
      setDialogType('')
      setDialogData({id:'', ...initRow})
      break;
    default:
      setDialogType('')
      setDialogData({id:'', ...initRow})
      break;
  } 
}

const renderData = filteredData && filteredData.map((row: RowSchema)=>{
  return (<Card cardData={row} cardReturn={(id:string, type:'Delete'|'Update')=>cardAction(id,type)} ></Card>)
})

  return (
    <>
      {dialogType && (
        <Dialog type={dialogType} data={dialogData} cancel={() => setDialogType('')} handle={(rData)=> dialogAction(rData)}/>)}
      <div className='search-bar'>
        <label> Search Name: 
          <input className='search-input'
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue((e.target as HTMLInputElement).value)}
          ></input>
        </label>
        <label>
          <input className='checkbox'
            type="checkbox" 
            checked={maleCheck}
            onChange={handleMaleCheck}/>
        Male
        </label>
        <label>
          <input className='checkbox'
            type="checkbox" 
            checked={femaleCheck}
            onChange={handleFemaleCheck}/>
        Female
        </label>
        <Button type='primary' label='Create New' action={() => newAction()} />
      </div>
      <Scroll>
        <ul className='data-wrapper'>{renderData}</ul>
      </Scroll>
      
    </>
  );
}

export default App;
