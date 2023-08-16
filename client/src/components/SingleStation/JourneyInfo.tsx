import { Box, List, Button, ListItem, ListItemText, Typography } from "@mui/material"
import { Link } from "react-router-dom"

interface JourneyInfoProps {
  departing: boolean,
  stationName: string,
  journeyTotal: number,
  averageDistance: number,
  averageDuration: number,
  topStations: string[]
}
const JourneyInfo = (
  {departing, stationName, journeyTotal, averageDistance, averageDuration, topStations}
  :JourneyInfoProps) => {

  return (  
    <Box>
      <List>
        <Button
          variant="contained"
          component={Link}
          to={`/departingJourneys/${stationName}`}>
          {departing?'departing':'returning'} journeys
        </Button>
        <ListItem dense={true}>
          <ListItemText primary={
            `Number of journeys ${departing ? 'starting from':'ending at'} the station: ${journeyTotal}`
          } />
        </ListItem>
        <ListItem dense={true}>
          <ListItemText primary={`Average distance: ${Math.round(averageDistance)} m`} />
        </ListItem>
        <ListItem dense={true}>
          <ListItemText primary={`Average duration: ${Math.round(averageDuration)} s`} />
        </ListItem>
      </List>
      <List>
        <Typography>Top 5 {departing ? 'destinations':'origin stations' }</Typography>
        {topStations.map(name =>
          <ListItem dense={true} key={name}>
            <ListItemText primary={name} />
          </ListItem>
        )}
      </List>
    </Box>
  )
}
export default JourneyInfo