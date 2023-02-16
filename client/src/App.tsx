import {BaseJourney, BaseStation, Order} from "./types";
import {Routes, Route } from "react-router-dom"
import JourneyList from "./components/JourneyList";
import SingleStation from "./components/SingleStation";
import axios from "axios";
import { useEffect, useState } from "react";
import StationList from "./components/StationList";
import NavigationBar from "./components/NavigationBar";
import { Box, Typography } from "@mui/material";

const App = () => {

  const [stations, setStations] = useState<BaseStation[]>([])

  const [journeys, setJourneys] = useState<BaseJourney[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [orderBy, setOrderBy] = useState('distanceCovered')
  const [orderDirection, setOrder] = useState<Order>('asc')
  const [pageLimit, setPageLimit] = useState(1)

  useEffect(() => {
    axios
      .get(`/api/journeys?currentPage=${currentPage}&orderBy=${orderBy}&orderDirection=${orderDirection}`)
      .then(response => {
        setPageLimit(Math.floor(response.data.count/100))
        setJourneys(response.data.rows)
      })
  }, [currentPage, orderBy, orderDirection])

  useEffect(() => {
    axios
      .get('/api/stations')
      .then(response => {
        setStations(response.data)
      })
  }, [])

  const handlepreviousPageClick = () => setCurrentPage(currentPage - 1)
  const handleNextPageClick = () =>  setCurrentPage(currentPage + 1)

  const handleSortClick = (orderAttribute: string) =>  {
    if (orderBy === orderAttribute){
      orderDirection === 'asc' ? setOrder('desc') : setOrder('asc')
    } else {
      setOrderBy(orderAttribute)
      setOrder('asc')
    }
  }

  return (
    <Box sx={{ margin: 'auto', width: '50%', backgroundColor: 'white' }}>

      <NavigationBar/>

      <Routes>  
        <Route 
          path="/journeys"
          element={<JourneyList 
            journeys={journeys}
            pageLimit={pageLimit}
            orderBy={orderBy}
            orderDirection={orderDirection}
            currentPage={currentPage}
            onPreviousPageClick={handlepreviousPageClick}
            onNextPageClick={handleNextPageClick}
            onHandleSortClick={handleSortClick}
          />}
        />
        <Route path="/stations" element={<StationList stations={stations}/>} />
        <Route path="/stations/:id" element={<SingleStation stations={stations} />} />
      </Routes>

    </Box>
  );
}

export default App;
