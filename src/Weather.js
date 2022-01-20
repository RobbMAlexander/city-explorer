import './App.css';
import React from 'react';
import axios from 'axios';
import CityDisplay from './CityDisplay';

class Weather extends CityDisplay {
  constructor(props) {
    super(props);
    this.state = {
      weatherQuery: '',
      weatherRendered: false,
      errMsg: '',
      errRender: false,
      city: '',
      displayWeatherData: '',
      cityWeather,
    }
  }


  handleWeatherSubmit = (e) => {
    e.preventDefault();

    // todo: add query entry to weatherUrl

    
    let weatherUrl = `http://localhost/3001/weather?lat=${lat}&lon=${lon}`;

    try {
      let cityWeather = await axios.get(weatherUrl)

      this.setState({
        cityWeather: cityWeather,
      });
      this.weatherRendered = true;
    } catch (error) {
      this.setState({
        errRender: true,
        errMsg: `An error has occurred: ${error.response.data}`
      })
    }
  }
  render() {



    return (
      <>
        <h3>Weather for {`${city}`}</h3>
        <h3>{`${cityWeather}`}</h3>

        {this.state.displayWeatherData ? weatherRendered : ''}
      </>
    );


  };
}

export default Weather;
