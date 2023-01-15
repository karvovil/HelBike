import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FullStation } from "../types"

const StationList = () => {

  const [stations, setStations] = useState<FullStation[]>([])

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
          <li key={station.ID}>
            <Link to={`/stations/${station.Nimi}`}>{station.Nimi}</Link>
          </li>
        )}
      </ul>
    </div>
  )}
export default StationList
