import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BaseStation } from "../types"

const StationList = () => {

  const [stations, setStations] = useState<BaseStation[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/stations')
      .then(response => {
        setStations(response.data)
      })
  }, [])

  return(
    <div>
      <h2>Stations</h2>
      <ul>
        {stations.map( station => 
          <li key={station.id}>
            <Link to={`/stations/${station.name}`}>{station.name}</Link>
          </li>
        )}
      </ul>
    </div>
  )}
export default StationList
