import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BaseStation } from "../types";
import { Button, ListItemText, ListSubheader } from "@mui/material";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

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
  const [topDestinationStations, setTopDestinationStations] = useState<number[]>([1,2,3,4,5])
  const [topOriginStations, setTopOriginStations] = useState<number[]>([1,2,3,4,5])
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
      <p>
        <img src={mapUrl} alt='map'/>
      </p>
      <Button
        variant="contained"
        component={Link}
        to={`/departingJourneys/${station.name}`} >   
        show departing journeys
      </Button>
      <Button
        variant="contained"
        component={Link}
        to={`/returningJourneys/${station.name}`}>   
        show returning journeys
      </Button>

      <List subheader={<ListSubheader>Top 5 origin stations</ListSubheader>}>
        {stations
          .filter(station => topDestinationStations.includes(station.id) )
          .map( station => 
            <ListItem dense={true} key={station.id}>
              <ListItemText primary={station.name}/>
            </ListItem>
          )}
      </List>
      
      <List subheader={<ListSubheader>Top 5 destinations</ListSubheader>}>
        {stations
          .filter(station => topOriginStations.includes(station.id) )
          .map( station => 
            <ListItem dense={true} key={station.id}>
              <ListItemText primary={station.name}/>
            </ListItem>
          )}
      </List>
    </div>
      
  );
}
export default SingleStation