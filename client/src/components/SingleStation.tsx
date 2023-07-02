import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BaseStation } from "../types";

interface SingleStationProps {stations: BaseStation[] }

const SingleStation = ({stations}: SingleStationProps) => {

  const { id } = useParams();
  const [startTotal, setStartTotal] = useState<string>('...loading');
  const [endTotal, setEndTotal] = useState<string>('...loading');
  const [averageStartingDistance, setAverageStartingDistance] = useState<string>('...loading');
  const [averageEndingDistance, setAverageEndingDistance] = useState<string>('...loading');
  const [averageStartingDuration, setAverageStartingDuration] = useState<string>('...loading');
  const [averageEndingDuration, setAverageEndingDuration] = useState<string>('...loading');
  const [mapUrl, setMapUrl] = useState<string>('')
  const station = stations.find(s => s.id.toString() == id)
  
  useEffect(() => {
    axios
      .get(`/api/stations/${id}`)
      .then(response => {
        setStartTotal(response.data.departingTotal.toString())
        setEndTotal(response.data.returningTotal.toString())
        setAverageStartingDistance(response.data.departingDistanceAverage.toString())
        setAverageEndingDistance(response.data.returningDistanceAverage.toString())
        setAverageStartingDuration(response.data.departingDurationAverage.toString())
        setAverageEndingDuration(response.data.returningDurationAverage.toString())
        setMapUrl(response.data.mapUrl)
      })
  }, []);
  console.log(process.env);
  
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
        The average distance of a journey starting from the station: {averageStartingDistance} 
      </p>
      <p>
        The average distance of a journey ending at the station: {averageEndingDistance}
      </p>
      <p>
        The average duration of a journey starting from the station: {averageStartingDuration} 
      </p>
      <p>
        The average duration of a journey ending at the station: {averageEndingDuration} 
      </p>
      <img src={mapUrl} alt='map'/>
    </div>
  );
}
export default SingleStation