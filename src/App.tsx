import { useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import savedData from 'data/users.json'
import { Button, Card, Dialog, Scroll, Search } from 'components'
import { RowSchema } from 'interfaces/schemas'
import { initRow } from 'data/initialValues'
import useFilter from 'hooks/useFilter'

function App() {
    const [data, setData] = useState<RowSchema[]>([])
    const [filteredData, setFilteredData] = useState<RowSchema[]>([])
    const [dialogType, setDialogType] = useState<'Delete' | 'Update' | 'Create' | ''>('')
    const [dialogData, setDialogData] = useState<RowSchema>({ id: '', ...initRow })

    useEffect(() => {
        const fetchData = async () =>  {
          try {
            const response = await axios.get('https://my.api.mockaroo.com/api/users?key=10d78d90')
            if (!response.data.error) {
              setData(response.data)
            }
          } catch (e){
              setData(savedData)
          }
        }
        fetchData()
    }, [])

    useEffect(() => {
        data && setFilteredData(data)
    }, [data])

    const { searchValue, setSearchValue, femaleCheck, maleCheck, handleFemaleCheck, handleMaleCheck } = useFilter(
        data,
        setFilteredData
    )

    const initDialogAll = () => {
      setDialogType('')
      setDialogData({ id: '', ...initRow })
    }

    const newAction = () => {
        setDialogType('Create')
        setDialogData({ id: uuidv4(), ...initRow })
    }

    const cardAction = (id: string, type: 'Delete' | 'Update') => {
        setDialogType(type)
        if (type === 'Delete') {
            setDialogData({ id: id, ...initRow })
        }
        if (type === 'Update') {
            const updRow = data.filter((row) => {
                return row.id === id
            })
            setDialogData(updRow[0])
        }
    }

    const dialogAction = (newRow: RowSchema) => {
        switch (dialogType) {
            case 'Delete':
                const delData = data.filter((row: RowSchema) => {
                    return row.id !== newRow.id
                })
                setData(delData)
                initDialogAll()
                break
            case 'Update':
                const updData = data.map((row: RowSchema) => {
                    if (row.id === newRow.id) {
                        return newRow
                    }
                    return row
                })
                setData(updData)
                initDialogAll()
                break
            case 'Create':
                const creData = [...data]
                creData.unshift(newRow)
                setData(creData)
                initDialogAll()
                break
            default:
                initDialogAll()
                break
        }
    }

    const renderData =
        filteredData &&
        filteredData.map((row: RowSchema) => {
            return <Card cardData={row} cardReturn={(id: string, type: 'Delete' | 'Update') => cardAction(id, type)}></Card>
        })

    return (
        <>
            {dialogType && (
                <Dialog
                    type={dialogType}
                    data={dialogData}
                    cancel={() => setDialogType('')}
                    handle={(rData) => dialogAction(rData)}
                />
            )}
            <div className='search-bar'>
                <Search label='Search Name' searchValue={searchValue} handleSearch={(value) => setSearchValue(value)} />
                <label>
                    <input className='checkbox' type='checkbox' checked={maleCheck} onChange={handleMaleCheck} />
                    Male
                </label>
                <label>
                    <input className='checkbox' type='checkbox' checked={femaleCheck} onChange={handleFemaleCheck} />
                    Female
                </label>
                <Button type='primary' label='Create New' action={() => newAction()} />
            </div>
            <Scroll>
                <ul className='data-wrapper'>{renderData}</ul>
            </Scroll>
        </>
    )
}

export default App
