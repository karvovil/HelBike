import { BaseJourney } from "../types"
import Journey from "./Journey"
interface JourneyListProps {
  journeys: BaseJourney[],
  currentPage: number,
  pageLimit: number,
  onPreviousPageClick: React.MouseEventHandler<HTMLButtonElement>,
  onNextPageClick: React.MouseEventHandler<HTMLButtonElement>
}

const JourneyList = (
  {journeys, currentPage, pageLimit, onPreviousPageClick, onNextPageClick}
  : JourneyListProps) => {
    
  console.log(pageLimit)

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

      {journeys.map( j => <Journey 
        key={j.id} 
        journey={j}/> )}

    </div>
  );
}
export default JourneyList
