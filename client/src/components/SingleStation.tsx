import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BaseStation } from "../types";
import { Box, Button, ListItemText, Paper, Typography } from "@mui/material";
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

interface SingleStationProps {stations: BaseStation[] }

const SingleStation = ({stations}: SingleStationProps) => {

  const { id } = useParams();
  const [startTotal, setStartTotal] = useState<number>(0);
  const [endTotal, setEndTotal] = useState<number>(0);
  const [averageStartingDistance, setAverageStartingDistance] = useState<number>(0);
  const [averageEndingDistance, setAverageEndingDistance] = useState<number>(0);
  const [averageStartingDuration, setAverageStartingDuration] = useState<number>(0);
  const [averageEndingDuration, setAverageEndingDuration] = useState<number>(0);
  const [mapPic, setMapPic] = useState('')
  const [topDestinationStations, setTopDestinationStations] = useState<string[]>([])
  const [topOriginStations, setTopOriginStations] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const station = stations.find(s => s.id.toString() == id)
  
  useEffect(() => {
    axios
      .get(`/api/stations/${id}`)
      .then(response => {
        setStartTotal(response.data.departingTotal)
        setEndTotal(response.data.returningTotal)
        setAverageStartingDistance(response.data.departingDistanceAverage)
        setAverageEndingDistance(response.data.returningDistanceAverage)
        setAverageStartingDuration(response.data.departingDurationAverage)
        setAverageEndingDuration(response.data.returningDurationAverage)
        setMapPic(response.data.base64MapPic)
        setTopDestinationStations(response.data.topDestinationStations)
        setTopOriginStations(response.data.topOriginStations)
        setLoading(false)
      })
  }, []);
  if (!station) {return null}
  if (loading) {return(
    <>
      <Typography variant="h4">{station.name}</Typography>
      <Typography>...loading</Typography>
    </>
  )}
  return (
    <Paper sx={{pl: 1 }}>
      <Typography variant="h4">{station.name} </Typography>
      <Typography variant="h6">{station.address}</Typography>
      <Typography><img src={`data:image/jpeg;base64,${mapPic}`} /></Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Box>
          <List>
            <Button
              variant="contained"
              component={Link}
              to={`/departingJourneys/${station.name}`}>
              departing journeys
            </Button>
            <ListItem dense={true}>
              <ListItemText primary={`Number of journeys starting from the station: ${startTotal}`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average distance: ${Math.round(averageStartingDistance)} m`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average duration: ${Math.round(averageStartingDuration)} s`} />
            </ListItem>
          </List>
          <List>
            <Typography>Top 5 origin stations</Typography>
            {topOriginStations.map(stationName => <ListItem dense={true} key={stationName}>
              <ListItemText primary={stationName} />
            </ListItem>
            )}
          </List>
        </Box>
        <Box>
          <List>
            <Button
              variant="contained"
              component={Link}
              to={`/returningJourneys/${station.name}`}>
              returning journeys
            </Button>
            <ListItem dense={true}>
              <ListItemText primary={`Number of journeys ending at the station: ${endTotal}`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average distance ${Math.round(averageEndingDistance)} m`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average duration: ${Math.round(averageEndingDuration)} s`} />
            </ListItem>
          </List>
          
          <List>
            <Typography>Top 5 destinations</Typography>
            {topDestinationStations.map(stationName => <ListItem dense={true} key={stationName}>
              <ListItemText primary={stationName} />
            </ListItem>
            )}
          </List>
        </Box>
      </Box>
    </Paper>
      
  );
}
export default SingleStation