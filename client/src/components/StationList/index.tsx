import { ListItemButton, ListItemText, Paper, Typography } from "@mui/material"
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
    <Box sx={{ margin: 'auto', maxWidth: 360, backgroundColor: 'white'}}>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <List sx={{ }}>

        {stations
          .filter(s => s.name.toLowerCase().includes(filter.toLowerCase() ))
          .map( station => 
            <ListItem dense={true}key={station.id} disablePadding
              sx={{
                mr: 2,
                color: 'inherit',
                textDecoration: 'none',
              }} >
              <ListItemButton component="a" href={`/stations/${station.id}`}>
                <ListItemText primary={station.name} />
              </ListItemButton>
            </ListItem>
          )}

      </List>
    </Box>
  )}
export default StationList