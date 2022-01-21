import './App.css';
import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Weather from './Weather.js';
import Movies from './Movies.js';


// import CityDisplay from './CityDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      renderMap: false,
      cityData: {},
      mapSrc: '',
      displayWeather: false,
      weatherData: [],
      displayMovies: false,
      moviesData: [],
      errMsg: '',
      errRender: false,
    };
  };

  handleCityInput = (e) => {
    e.preventDefault();
    let cityEntry = e.target.value;
  console.log(cityEntry);
    this.setState({ searchQuery: cityEntry })
    
  };

  handleExplore = async (e) => {
    e.preventDefault();

    console.log(this.state.searchQuery);

    let apiURL = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;

    try {
      let mapData = await axios.get(apiURL)

      this.setState({
        // need only top result in LocationIQ array
        cityData: mapData.data[0],
        mapRender: true,
        mapSrc: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=10`,
        renderMap: true,
      })


      let serverWeatherURL = `https://city-explorer-rma.herokuapp.com/weather?lat=${this.state.cityData.lat}&lon=${this.state.cityData.lon}`;

      let weatherData = await axios.get(serverWeatherURL);
      this.setState({
        weatherData: weatherData.data,
        displayWeather: true,
      })


      let serverMoviesURL = `https://city-explorer-rma.herokuapp.com/movies?query=${this.state.searchQuery}`;

      let moviesData = await axios.get(serverMoviesURL);
      this.setState({
        moviesData: moviesData.data,
        displayMovies: true,
      })


    } catch (error) {
      console.log(error);
      this.setState({
        errMsg: `An error has occurred: ${error}`,
        errRender: true,
      })
    }
  }

  // handleCitySubmit = (e) => {
  //   e.preventDefault();

  //   this.getCityData(this.state.searchQuery);

  //   console.log(this.searchQuery);
  // }

  // getCityData = async (e) => {
  //   e.preventDefault();
  //   let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.searchQuery}&format=json`;

  //   try {

  //     let cityResults = await axios.get(url);

  //     this.setState({
  //       cityData: cityResults.data[0]
  //     })
  //   } catch (error) {
  //     this.setState({
  //       errRender: true,
  //       errMsg: `An error has occurred: ${error.response.status}, ${error.response.data}!`,

  //     })
  //   }
  // }


  render(

  ) {

    return (
      <>
        <header>
          <h1>Learn About A City</h1>
        </header>
        <main>
          <form onSubmit={this.handleExplore}>
            <label>Input A City
              <input name="city" type="text" onInput={this.handleCityInput} />
            </label>
            <button type="submit">Explore!</button>
          </form>
          {this.state.rendermap && <Card style={{ width: '50%' }}>
            <Card.Img src={this.state.mapSrc} />
            <Card.Title>{this.state.cityData.display_name}</Card.Title>
            <Card.Text>
              <p>Showing the city of {this.state.cityData.display_name} at:</p>
              <p>Latitude: {this.state.cityData.lat}; Longitude: {this.state.cityData.lon}</p>
            </Card.Text>
          </Card>
          }
          {
            this.state.displayWeather && <Weather data={this.state.weatherData} />
          }
          {
            this.state.displayMovies && <Movies data={this.state.moviesData} />
          }
          {this.state.renderError && <p>{this.state.errMsg}</p>}
        </main>
      </>
    );
  }
}



export default App;
