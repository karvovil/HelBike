import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseStation } from "../types";

interface SingleStationProps {stations: BaseStation[] }

const SingleStation = ({stations}: SingleStationProps) => {

  const { id } = useParams();
  const [startTotal, setStartTotal] = useState<string>('...loading');
  const [endTotal, setEndTotal] = useState<string>('...loading');
  const [averageStartingDistance, setAverageStartingDuration] = useState<string>('...loading');
  const [averageEndingDuration, setAverageEndingDuration] = useState<string>('...loading');
  const station = stations.find(s => s.id.toString() == id)
  
  useEffect(() => {
    axios
      .get(`/api/stations/${id}`)
      .then(response => {
        setStartTotal(response.data.departingTotal.toString())
        setEndTotal(response.data.returningTotal.toString())
        setAverageStartingDuration(response.data.departingDurationAverage.toString())
        setAverageEndingDuration(response.data.returningDurationAverage.toString())
      })
  }, [])
  
  if (!station) {return null}
  return (
    <div style={{border: '1px solid black'}}>
      <p>
        {station.name} 
      </p>
      <p>
        {station.address}
      </p>
      <p>
        Total number of journeys starting from the station: {startTotal}
      </p>
      <p>
        Total number of journeys ending at the station: {endTotal}
      </p>
      <p>
        The average duration of a journey starting from the station: {averageStartingDistance} 
      </p>
      <p>
        The average duration of a journey ending at the station: {averageEndingDuration} 
      </p>
    </div>
  );
}
export default SingleStation