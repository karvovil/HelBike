import { BaseJourney, Order } from '../../types'

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JourneyListContainer from './JourneyListContainer';

const JourneyList = () => {
  const [journeys, setJourneys] = useState<BaseJourney[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [orderBy, setOrderBy] = useState('distanceCovered')
  const [orderDirection, setOrder] = useState<Order>('asc')
  const [rowCount, setrowCount] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const { departingStationName, returningStationName } = useParams();
  useEffect(() => {
    axios
      .get(`/api/journeys?currentPage=${currentPage}&orderBy=${orderBy}` +
        `&orderDirection=${orderDirection}&rowsPerPage=${rowsPerPage}` +
        (departingStationName ? `&departingStation=${departingStationName}` : '') +
        (returningStationName ? `&returningStation=${returningStationName}` : ''))
      .then(response => {
        setrowCount(response.data.count)
        setJourneys(response.data.rows)
      })
  }, [currentPage, orderBy, orderDirection, rowsPerPage])

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => setCurrentPage(newPage)

  const handleSortClick = (orderAttribute: string) => {
    if (orderBy === orderAttribute) {
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
    <JourneyListContainer
      journeys={journeys}
      currentPage={currentPage}
      orderBy={orderBy}
      orderDirection={orderDirection}
      rowCount={rowCount}
      rowsPerPage={rowsPerPage}
      handlePageChange={handlePageChange}
      handleSortClick={handleSortClick}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}
export default JourneyList