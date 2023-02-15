import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { testJourneys } from '../../util/testData';
import Journey from './Journey';

test('renders journeys station names', () => {

  render(<Journey journey={testJourneys[0]} />);

  const element = screen.getByText(
    `${testJourneys[0].departureStationName} to ${testJourneys[0].returnStationName}`
  );
  expect(element).toBeDefined();
});