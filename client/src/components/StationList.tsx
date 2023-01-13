import { Link } from "react-router-dom"

const StationList = ({stations}: {stations: string[] }) => {
  return(
    <div>
      <h2>Stations</h2>
      <ul>
        {stations.map( station => 
          <li key={station}>
            <Link to={`/stations/${station}`}>{station}</Link>
          </li>
        )}
      </ul>
    </div>
  )}
export default StationList
