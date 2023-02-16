import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import { useState } from "react"
import { Link } from "react-router-dom"
import { BaseStation } from "../../types"
import Filter from "./Filter"

interface StationListProps {stations: BaseStation[] }


const StationList = ({stations}: StationListProps) => {
  
  const [filter, setFilter] = useState("")
  
  const handleFilterChange = (event: { target: { value: string } } ) => {
    setFilter(event.target.value)
  }

  return(
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <h2>Stations</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <ul>
        {stations
          .filter(s => s.name.toLowerCase().includes(filter.toLowerCase() ))
          .map( station => 
            <List key={station.id}>
              <ListItem disablePadding component="a" href={`/stations/${station.id}`}
                sx={{
                  mr: 2,
                  fontWeight: 700,
                  color: 'inherit',
                  textDecoration: 'none',
                }} >
                {station.name}
              </ListItem>
            </List>
          )}
      </ul>
    </Box>
  )}
export default StationList