import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {BaseStation} from "../types";

const SingleStation = () => {

  const { id } = useParams();
  const [station, setStation] = useState<BaseStation>({name: "", address: ""});
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stations/${id}`)
      .then(response => {
        setStation(response.data)
      })
  }, [])
  
  if (!station) {return null}
  return (
    <div style={{border: '1px solid black'}}>
      <p>
        {station.name} 
      </p>
      <p>
        {station.address}
      </p>
    </div>
  );
}
export default SingleStation