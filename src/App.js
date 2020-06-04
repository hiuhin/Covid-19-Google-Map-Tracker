import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import {CardDeck, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CardComponent from "./components/CardComponent";
import Columns from "react-columns";
import GoogleMapReact from "google-map-react";

function App() {
  const [totalStats, setTotalStats] = useState([]);
  const [byCountries, setByCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");

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
  
  const filterCountries = byCountries.filter(country => {
    return searchCountries === "" ? country : country.country.toLowerCase().startsWith(searchCountries);
  })

  const countriesLocation = byCountries.map((country, i) => {
    return (
      <div
        lat={country.countryInfo.lat}
        lng={country.countryInfo.long}
        style={{
          color: "red",
          background: "#FFF",
          height: "25px",
          width: "35px",
          textAlign: "center",
          borderRadius: "20%",
        }}
      >
        <img height="10px" src={country.countryInfo.flag} />
        <br />
        {country.cases}
      </div>
    )
  })

  const queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 5,
    query: 'min-width: 1000px'
  }];

  return (
    <div>
      <br />
      <h2 style={{ textAlign: "center", fontFamily: "Lucia" }}>
        Covid-19 Live Stats
      </h2>
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

      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAnHw5gW1ik8KIePAgp3De8lHtmPXB6L1g" }}
          defaultCenter={{ lat: 34, lng: 9}}
          defaultZoom={1}
        >
          {countriesLocation}
        </GoogleMapReact>
      </div>

      <Form style={{ margin: "10px" }}>
        <Form.Group controlId="formGroupSearch">
          <Form.Control
            type=""
            placeholder="Search a Country"
            onChange={(e) => setSearchCountries(e.target.value.toLowerCase())}
          />
        </Form.Group>
      </Form>

      <Columns queries={queries}>
        {filterCountries.map((country, i) => (
          <CardComponent key={i} country={country} />
        ))}
      </Columns>
    </div>
  );
}

export default App;
