interface FilterProps {
    filter: string,
    handleFilterChange: React.ChangeEventHandler<HTMLInputElement>
  }

const Filter = ({filter, handleFilterChange}: FilterProps) => {
  return(
    <div>
        find Stations: 
      <input  value={filter} onChange={handleFilterChange}/>
    </div>
  )
}
export default Filter