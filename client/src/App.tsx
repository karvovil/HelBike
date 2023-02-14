import {BaseJourney, BaseStation} from "./types";
import {Routes, Route, Link} from "react-router-dom"
import JourneyList from "./components/JourneyList";
import SingleStation from "./components/SingleStation";
import axios from "axios";
import { useEffect, useState } from "react";
import StationList from "./components/StationList";

const App = () => {

  const [stations, setStations] = useState<BaseStation[]>([])

  const [journeys, setJourneys] = useState<BaseJourney[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [orderBy, setOrderBy] = useState('id')
  const [pageLimit, setPageLimit] = useState(1)

  useEffect(() => {
    axios
      .get(`/api/journeys?currentPage=${currentPage}&orderBy=${orderBy}`)
      .then(response => {
        setPageLimit(Math.floor(response.data.count/100))
        setJourneys(response.data.rows)
      })
  }, [currentPage, orderBy])

  useEffect(() => {
    axios
      .get('/api/stations')
      .then(response => {
        setStations(response.data)
      })
  }, [])

  const handlepreviousPageClick = () => setCurrentPage(currentPage - 1)
  const handleNextPageClick = () =>  setCurrentPage(currentPage + 1)
  const handleSortClick = (orderString: string) =>  setOrderBy(orderString)

  return (
    <div>
      <div>
        <Link to="/journeys">journeys</Link>
        <Link to="/stations">stations</Link>
      </div>

      <div>
        <h1> Helsinki City Bike App</h1>
      </div>

      <Routes>  
        <Route 
          path="/journeys"
          element={<JourneyList 
            journeys={journeys}
            pageLimit={pageLimit}
            currentPage={currentPage}
            onPreviousPageClick={handlepreviousPageClick}
            onNextPageClick={handleNextPageClick}
            onHandleSortClick={handleSortClick}
          />}
        />
        <Route path="/stations" element={<StationList stations={stations}/>} />
        <Route path="/stations/:id" element={<SingleStation stations={stations} />} />
      </Routes>

    </div>
  );
}

export default App;
