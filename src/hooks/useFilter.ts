import { useEffect, useState } from 'react'
import { RowSchema } from '../interfaces/schemas'

const useFilter = (data: RowSchema[], setFilteredData: (data: RowSchema[]) => void) => {
    const [maleCheck, setMaleCheck] = useState(true)
    const [femaleCheck, setFemaleCheck] = useState(true)
    const [searchValue, setSearchValue] = useState('')

    const nameMatched = (row :RowSchema) => {
        return (row.first_name.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
        row.last_name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    }
    useEffect(() => {
        if (maleCheck && femaleCheck) {
            const searchData = data.filter((row: RowSchema) => nameMatched(row))
            setFilteredData(searchData)
        }
        if (maleCheck && !femaleCheck) {
            const maleData = data.filter(
                (row: RowSchema) => row.gender.toLowerCase() === 'male' && (nameMatched(row))
            )
            setFilteredData(maleData)
        }
        if (!maleCheck && femaleCheck) {
            const femaleData = data.filter(
                (row: RowSchema) => row.gender.toLowerCase() === 'female' &&(nameMatched(row))
            )
            setFilteredData(femaleData)
        }
        if (!maleCheck && !femaleCheck) {
            setFilteredData([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maleCheck, femaleCheck, searchValue, data])

    const handleMaleCheck = () => {
        setMaleCheck((prevState) => !prevState)
    }
    const handleFemaleCheck = () => {
        setFemaleCheck((prevState) => !prevState)
    }

    return { searchValue, setSearchValue, femaleCheck, maleCheck, handleFemaleCheck, handleMaleCheck }
}

export default useFilter
