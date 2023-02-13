import { useState } from "react"
import { Link } from "react-router-dom"
import { BaseStation } from "../types"
import Filter from "./Filter"

interface StationListProps {stations: BaseStation[] }


const StationList = ({stations}: StationListProps) => {
  
  const [filter, setFilter] = useState("")
  
  const handleFilterChange = (event: { target: { value: string } } ) => {
    setFilter(event.target.value)
  }

  return(
    <div>
      <h2>Stations</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <ul>
        {stations
          .filter(s => s.name.toLowerCase().includes(filter.toLowerCase() ))
          .map( station => 
            <li key={station.id}>
              <Link to={`/stations/${station.id}`}>{station.name}</Link>
            </li>
          )}
      </ul>
    </div>
  )}
export default StationList