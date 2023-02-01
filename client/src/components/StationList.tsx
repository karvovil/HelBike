import { Link } from "react-router-dom"
import { BaseStation } from "../types"

interface StationListProps {stations: BaseStation[] }

const StationList = ({stations}: StationListProps) => {

  return(
    <div>
      <h2>Stations</h2>
      <ul>
        {stations.map( station => 
          <li key={station.id}>
            <Link to={`/stations/${station.id}`}>{station.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )}
export default StationList
