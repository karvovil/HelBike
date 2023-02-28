import TextField from "@mui/material/TextField"

interface FilterProps {
    filter: string,
    handleFilterChange: React.ChangeEventHandler<HTMLInputElement>
  }

const Filter = ({filter, handleFilterChange}: FilterProps) => {
  return(
    <TextField
      value={filter}
      onChange={handleFilterChange}
      label="Search Stations"
      variant="outlined"
      margin="normal"
      size="small"/>
  )
}
export default Filter