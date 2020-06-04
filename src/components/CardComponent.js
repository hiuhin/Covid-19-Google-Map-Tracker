import React from 'react';
import Card from "react-bootstrap/Card";

export default function CardComponent(props) {
    const country = props.country;

    return (
      <Card style={{ margin: "5px"}}>
        <Card.Img variant="top" src={country.countryInfo.flag} />
        <Card.Body>
          <Card.Title className="text-center">{country.country}</Card.Title>
          <Card.Text>Cases: {country.cases}</Card.Text>
          <Card.Text>Deaths: {country.deaths}</Card.Text>
          <Card.Text>Recovered: {country.recovered}</Card.Text>
          <Card.Text>Active: {country.active}</Card.Text>
          <Card.Text>Critical: {country.critical}</Card.Text>
        </Card.Body>
      </Card>
    );
}
