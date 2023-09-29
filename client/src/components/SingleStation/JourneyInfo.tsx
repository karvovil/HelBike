import { List, ListItem, ListItemText, Typography, ListItemButton, Stack } from '@mui/material'
import { Link as MUILink } from '@mui/material'
import { Link } from 'react-router-dom'
import { BaseStation } from '../../types'

interface JourneyInfoProps {
  stations: BaseStation[],
  departing: boolean,
  stationName: string,
  journeyTotal: number,
  averageDistance: number,
  averageDuration: number,
  topStations: string[]
}
const JourneyInfo = (
  { stations, departing, stationName, journeyTotal, averageDistance, averageDuration, topStations }: JourneyInfoProps) => {

  return (
    <Stack alignItems='center' justifyContent='space-between' >
      <Stack spacing={1} margin={1}>
        <Typography fontSize={20} >
          {journeyTotal}
          <MUILink
            href={`/${departing ? 'Departing' : 'Returning'}Journeys/${stationName}`}
            underline='hover'
          >
            <strong> {departing ? 'Departing' : 'Returning'} Journeys </strong>
          </MUILink>
        </Typography>
        <Typography>
        Average distance {Math.round(averageDistance)} m
        </Typography>
        <Typography>
        Average duration {Math.floor(averageDuration / 60)} m {Math.round(averageDuration % 60)} s
        </Typography>
      </Stack>
      <List>
        <Typography sx={{ textAlign: 'left', fontWeight: 600 }}>
          Top 5 {departing ? 'origin stations' : 'destinations'}
        </Typography>
        {topStations.map(name =>
          <ListItem dense={true} key={name}>
            <ListItemButton component={Link} to={`/stations/${stations.find(s => s.name === name)?.id}`}>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Stack>
  )
}
export default JourneyInfo