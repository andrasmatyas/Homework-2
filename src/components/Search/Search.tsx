interface searchProps {
    label: string
    searchValue: string
    handleSearch:(value: string) => void
}
const Search = ({label, searchValue, handleSearch}: searchProps) => {
  return (
    <label>
        {label}:
        <input
            className='search-input'
            type='text'
            value={searchValue}
            onChange={(e) => handleSearch((e.target as HTMLInputElement).value)}
        />
    </label>
  )
}

export default Search