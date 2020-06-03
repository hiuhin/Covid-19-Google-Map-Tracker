import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import {CardDeck} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CardComponent from "./components/CardComponent";
import Columns from "react-columns";

function App() {
  const [totalStats, setTotalStats] = useState([]);
  const [byCountries, setByCountries] = useState([]);
  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v2/all"),
        axios.get("https://disease.sh/v2/countries"),
      ])
      .then((res) => {
        setTotalStats(res[0].data);
        setByCountries(res[1].data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const lastUpdatedDate = new Date(totalStats.updated).toString();
  const queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 5,
    query: 'min-width: 1000px'
  }];

  return (
    <div className="App">
      <CardDeck>
        <Card
          bg="secondary"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>{totalStats.cases}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last Updated {lastUpdatedDate}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="danger"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>{totalStats.deaths}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last Updated {lastUpdatedDate}</small>
          </Card.Footer>
        </Card>
        <Card
          bg="success"
          text="white"
          className="text-center"
          style={{ margin: "10px" }}
        >
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>{totalStats.recovered}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdatedDate}</small>
          </Card.Footer>
        </Card>
      </CardDeck>
        <Columns queries={queries}>
          {byCountries.map((country, i) => (
            <CardComponent
              key={i}
              country={country}
              style={{ margin: "10px" }}
            />
          ))}
        </Columns>
    </div>
  );
}

export default App;
