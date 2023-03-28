import {BaseJourney, BaseStation, Order} from "./types";
import {Routes, Route } from "react-router-dom"
import JourneyList from "./components/JourneyList";
import SingleStation from "./components/SingleStation";
import axios from "axios";
import { useEffect, useState } from "react";
import StationList from "./components/StationList";
import NavigationBar from "./components/NavigationBar";
import { Box } from "@mui/material";

const App = () => {

  const [stations, setStations] = useState<BaseStation[]>([])

  const [journeys, setJourneys] = useState<BaseJourney[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [orderBy, setOrderBy] = useState('distanceCovered')
  const [orderDirection, setOrder] = useState<Order>('asc')
  const [rowCount, setrowCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  console.log("this is the new version asdasdasd");
  
  useEffect(() => {
    axios
      .get(`/api/journeys?currentPage=${currentPage}&orderBy=${orderBy}&orderDirection=${orderDirection}&rowsPerPage=${rowsPerPage}`)
      .then(response => {
        setrowCount(response.data.count)
        setJourneys(response.data.rows)
      })
  }, [currentPage, orderBy, orderDirection, rowsPerPage])

  useEffect(() => {
    axios
      .get('/api/stations')
      .then(response => {
        setStations(response.data)
      })
  }, [])

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => setCurrentPage(newPage)

  const handleSortClick = (orderAttribute: string) =>  {
    if (orderBy === orderAttribute){
      orderDirection === 'asc' ? setOrder('desc') : setOrder('asc')
    } else {
      setOrderBy(orderAttribute)
      setOrder('asc')
    }
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  return (
    <Box sx={{ margin: 'auto', width: '50%', minWidth: '500px', backgroundColor: 'white' }}>

      <NavigationBar/>

      <Routes>  
        <Route 
          path="/journeys"
          element={<JourneyList 
            journeys={journeys}
            rowCount={rowCount}
            orderBy={orderBy}
            orderDirection={orderDirection}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
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
