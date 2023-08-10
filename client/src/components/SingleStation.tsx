import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BaseStation } from "../types";
import { Box, Button, ListItemText, ListSubheader, Paper, Typography } from "@mui/material";
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
  const [mapPic, setMapPic] = useState('')
  const [topDestinationStations, setTopDestinationStations] = useState<string[]>([])
  const [topOriginStations, setTopOriginStations] = useState<string[]>([])
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
        setMapPic(response.data.base64MapPic)
        setTopDestinationStations(response.data.topDestinationStations)
        setTopOriginStations(response.data.topOriginStations)
      })
  }, []);
  if (!station) {return null}
  return (
    <Paper>
      <Typography variant="h4">{station.name} </Typography>
      <Typography variant="h6">{station.address}</Typography>
      <Typography><img src={`data:image/jpeg;base64,${mapPic}`} /></Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <Box>
          <Button
            variant="contained"
            component={Link}
            to={`/departingJourneys/${station.name}`}>
          departing journeys
          </Button>
          <List>
            <ListItem dense={true}>
              <ListItemText primary={`Number of journeys starting from the station: ${startTotal}`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average distance: ${averageStartingDistance}`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average duration: ${averageStartingDuration}`} />
            </ListItem>
          </List>
          <List subheader={<ListSubheader>Top 5 origin stations</ListSubheader>}>
            {topOriginStations.map(stationName => <ListItem dense={true} key={stationName}>
              <ListItemText primary={stationName} />
            </ListItem>
            )}
          </List>
        </Box>
        <Box>
          <Button
            variant="contained"
            component={Link}
            to={`/returningJourneys/${station.name}`}>
          returning journeys
          </Button>
          <List>
            <ListItem dense={true}>
              <ListItemText primary={`Number of journeys ending at the station: ${endTotal}`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average distance ${averageEndingDistance}`} />
            </ListItem>
            <ListItem dense={true}>
              <ListItemText primary={`Average duration: ${averageEndingDuration}`} />
            </ListItem>
          </List>
          <List subheader={<ListSubheader>Top 5 destinations</ListSubheader>}>
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