interface PaginationProps {
  currentPage: number,
  pageLimit: number,
  onPreviousPageClick: React.MouseEventHandler<HTMLButtonElement>,
  onNextPageClick: React.MouseEventHandler<HTMLButtonElement>
}
const Pagination = (
  {currentPage, pageLimit, onPreviousPageClick, onNextPageClick}
: PaginationProps) => {

  return (
    <>
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
    </>
  )
}

export default Pagination