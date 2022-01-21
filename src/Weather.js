import './App.css';
import React from 'react';
import WeatherLI from './WeatherLI';
import ListGroup from 'react-bootstrap/ListGroup';

class Weather extends React.Component {

  render() {
    let cityForecast = this.props.data;
    console.log(this.props);
    cityForecast.map((data, index) => {
      return (
        <WeatherLI
          key={index}
          date={data.date}
          description={data.description}
          dayHigh={data.dayHigh}
          dayLow={data.dayLow}
        />
      )
    })

    return (
      <ListGroup>
        {cityForecast}
      </ListGroup>
    )
  }
}

export default Weather;
