import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BaseStation } from '../../types';
import { Box, Paper, Typography } from '@mui/material';
import JourneyInfo from './JourneyInfo';

interface SingleStationProps {stations: BaseStation[] }

const SingleStation = ({ stations }: SingleStationProps) => {

  const { id } = useParams();
  const station = stations.find(s => s.id.toString() == id)

  const [startTotal, setStartTotal] = useState<number>(0);
  const [endTotal, setEndTotal] = useState<number>(0);
  const [averageStartingDistance, setAverageStartingDistance] = useState<number>(0);
  const [averageEndingDistance, setAverageEndingDistance] = useState<number>(0);
  const [averageStartingDuration, setAverageStartingDuration] = useState<number>(0);
  const [averageEndingDuration, setAverageEndingDuration] = useState<number>(0);
  const [mapPic, setMapPic] = useState('')
  const [topDestinationStations, setTopDestinationStations] = useState<string[]>([])
  const [topOriginStations, setTopOriginStations] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
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
  }, [id]);
  if (!station) { return <></> }
  if (loading) { return (
    <>
      <Typography variant="h4">{station.name}</Typography>
      <Typography>...loading</Typography>
    </>
  ) }
  return (
    <Paper sx={{ pl: 1 }}>
      <Typography variant="h4">{station.name} </Typography>
      <Typography variant="h6">{station.address}</Typography>
      <Typography><img src={`data:image/jpeg;base64,${mapPic}`} /></Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        <JourneyInfo
          stations={stations}
          departing={true}
          stationName={station.name}
          journeyTotal={startTotal}
          averageDistance={averageStartingDistance}
          averageDuration={averageStartingDuration}
          topStations={topDestinationStations}
        />
        <JourneyInfo
          stations={stations}
          departing={false}
          stationName={station.name}
          journeyTotal={endTotal}
          averageDistance={averageEndingDistance}
          averageDuration={averageEndingDuration}
          topStations={topOriginStations}
        />
      </Box>
    </Paper>
  );
}
export default SingleStation