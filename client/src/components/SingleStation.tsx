import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleStation = () => {

  const { id } = useParams();
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/stations/${id}`)
      .then(response => {
        setName(response.data.Nimi)
        setAddress(response.data.Osoite)
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
    </div>
  );
}
export default SingleStation