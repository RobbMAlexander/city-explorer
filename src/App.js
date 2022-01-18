import './App.css';
import React from 'react';
import axios from 'axios';
import CityDisplay from './CityDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCityData: false,
      cityData: [],
      userSearch: '',
      errMsg: '',
      errRender: false,

    }
  }

  handleExplore = async () => {

    try {
      let cityResults = await axios.get('url')

      this.setState({
        displayCityData: true,
        cityData: cityResults.data.results
      })
    } catch (error) {
      this.setState({
        errRender: true,
        errMsg: `An error has occurred: ${error.response.status}; ${error.response.data}`
      })
    }
  }

  handleCitySubmit = e => {
    e.preventDefault();
    let city = e.target.city.value
    this.setState({
      userSearch: e.target.city.value,
    });
    this.getCityData(city);
  }

  getCityData = async (city) => {
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.local.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${city}&format=json`;

      let cityResults = await axios.get(url);

      this.setState({
        cityData: cityResults.data[0]
      })
    } catch (error) {
      this.setState({
        errRender: true,
        errMsg: `An error has occurred: ${error.response.status}; ${error.response.data}`

      })
    }
  }
  render() {
    let cityRendered = this.state.cityData.map((city, cityIndex) => (
      <p key={cityIndex}>{city.name}</p>
    ))

    return (
      <>
        <CityDisplay>
        </CityDisplay>


        <form onSubmit={this.handleCitySubmit}>
          <label>Input A City
            <input name="city" type="text" />
          </label>
          <button type="submit">Explore!</button>
        </form>
      </>
    );
  }
}



export default App;
