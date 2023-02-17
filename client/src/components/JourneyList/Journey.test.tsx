import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { testJourneys } from '../../util/testData';
import Journey from './Journey';

test('renders journeys station names', () => {

  render(<Journey journey={testJourneys[0]} />);

  const departureStationName = screen.getByText(
    `${testJourneys[0].departureStationName}`
  );
  expect(departureStationName).toBeDefined();

  const returnStationName = screen.getByText(
    `${testJourneys[0].returnStationName}`
  );
  expect(returnStationName).toBeDefined();
});