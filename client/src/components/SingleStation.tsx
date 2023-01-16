import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleStation = () => {

  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [startTotal, setStartTotal] = useState<number>(0);
  const [endTotal, setEndTotal] = useState<number>(0);
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stations/${id}`)
      .then(response => {
        setName(response.data.Nimi)
        setAddress(response.data.Osoite)
        setStartTotal(response.data.startingFromTotal)
        setEndTotal(response.data.endingToTotal)
      })
  }, [])
  
  if (!name) {return null}
  return (
    <div style={{border: '1px solid black'}}>
      <p>
        {name} 
      </p>
      <p>
        {address}
      </p>
      <p>
        Total number of journeys starting from the station: {startTotal}
      </p>
      <p>
        Total number of journeys ending at the station: {endTotal}
      </p>
    </div>
  );
}
export default SingleStation