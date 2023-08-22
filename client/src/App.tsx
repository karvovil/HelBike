import {BaseStation} from './types';
import {Routes, Route } from 'react-router-dom'
import JourneyList from './components/JourneyList';
import SingleStation from './components/SingleStation';
import axios from 'axios';
import { useEffect, useState } from 'react';
import StationList from './components/StationList';
import NavigationBar from './components/NavigationBar';
import { Box } from '@mui/material';
import FrontPage from './components/FrontPage';

const App = () => {

  const [stations, setStations] = useState<BaseStation[]>([])

  useEffect(() => {
    axios
      .get('/api/stations')
      .then(response => {
        setStations(response.data)
      })
  }, [])

  return (
    <Box sx={{ margin: 'auto', maxWidth:'900px' }}>
      <NavigationBar/>
      <Routes>
        <Route path='/' element={<FrontPage/>}/>
        <Route path='/journeys' element={<JourneyList />} />
        <Route path='/stations' element={<StationList stations={stations}/>} />
        <Route path='/stations/:id' element={<SingleStation stations={stations} />} />
        <Route path='/departingJourneys/:departingStationName' element={<JourneyList />} />
        <Route path='/returningJourneys/:returningStationName' element={<JourneyList />} />
      </Routes>
    </Box>
  );
}
export default App;
