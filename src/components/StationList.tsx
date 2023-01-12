const StationList = ({stations}: {stations: string[] }) => {
  return(
    <div>
      {stations.map( station => 
        <div key={station} style={{border: '1px solid black'}}>
          <p>
            {station}
          </p>
        </div> )}
    </div>
  );
}
export default StationList
