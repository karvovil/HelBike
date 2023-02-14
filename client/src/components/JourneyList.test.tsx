import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { testJourneys } from '../util/testData';
import JourneyList from './JourneyList';

test('renders every journeys station names', () => {

  render(<JourneyList
    journeys={testJourneys}
    currentPage={1}
    pageLimit={100}
    orderBy={'id'}
    order={'desc'}
    onPreviousPageClick={()=>({})}
    onNextPageClick={()=>({})}
    onHandleSortClick={()=>({})}
  />);

  const elements =
   testJourneys.map(j => screen.getByText(
     `${j.departureStationName} to ${j.returnStationName}`
   ));
  elements.map(e => expect(e).toBeDefined());
});