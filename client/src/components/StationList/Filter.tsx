import { Box } from "@mui/material"
import TextField from "@mui/material/TextField"

interface FilterProps {
    filter: string,
    handleFilterChange: React.ChangeEventHandler<HTMLInputElement>
  }

const Filter = ({filter, handleFilterChange}: FilterProps) => {
  return(
    <Box>
      <TextField
        value={filter}
        onChange={handleFilterChange}
        label="Search"
        variant="outlined" />
    </Box>
  )
}
export default Filter