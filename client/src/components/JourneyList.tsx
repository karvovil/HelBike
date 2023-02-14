import { BaseJourney } from "../types"
import Journey from "./Journey"
interface JourneyListProps {
  journeys: BaseJourney[],
  currentPage: number,
  pageLimit: number,
  onPreviousPageClick: React.MouseEventHandler<HTMLButtonElement>,
  onNextPageClick: React.MouseEventHandler<HTMLButtonElement>
  onHandleSortClick: (orderString: string) => void
}

const JourneyList = (
  {journeys, currentPage, pageLimit,//TODO don't allow increasing page number beyond this
    onPreviousPageClick, onNextPageClick, onHandleSortClick}
  : JourneyListProps) => {
    
  return(
    <div>

      <button 
        onClick={onPreviousPageClick}
        disabled={currentPage < 2}
      >
        Prev. Page
      </button>

      {currentPage}

      <button onClick={onNextPageClick}>
        Next Page
      </button>


      <button onClick={() => onHandleSortClick('distanceCovered')}>
        Sort by distance
      </button>
      <button onClick={() => onHandleSortClick('duration')}>
        Sort by duration
      </button>
      <button onClick={() => onHandleSortClick('departureStationName')}>
        Sort by departure station name
      </button>
      <button onClick={() => onHandleSortClick('returnStationName')}>
        Sort by return station name
      </button>

      {journeys.map( j => <Journey 
        key={j.id} 
        journey={j}/> )}

    </div>
  );
}
export default JourneyList
