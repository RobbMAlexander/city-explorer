import './App.css';
import React from 'react';
import axios from 'axios';
// import App from './App.js'


class CityDisplay extends React.Component {
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

  handleCityInput = (e) => this.setState({ userSearch: e.target.value })

  handleExplore = async () => {

    let APIurl = 'https://us1.locationiq.com/v1/search.php';

    try {
      let cityResults = await axios.get(APIurl)

      this.setState({
        displayCityData: true,
        cityData: cityResults.data.results
      })
    } catch (error) {
      this.setState({
        errRender: true,
        errMsg: `An error has occurred: ${error.response.data}`
      })
    }
  }

  handleCitySubmit = (e) => {
    e.preventDefault();
    
    this.getCityData(this.state.userSearch);
  
    console.log(this.userSearch);
  }

  getCityData = async (e) => {
    e.preventDefault();
    try {
      let url = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.userSearch}&format=json`

      let cityResults = await axios.get(url);

      this.setState({
        cityData: cityResults.data[0]
      })
    } catch (error) {
      this.setState({
        errRender: true,
        errMsg: `An error has occurred: ${error.response.status}, ${error.response.data}!`

      })
    }
  }

  render() {

    let cityRendered = this.state.cityData.map((city, cityIndex) => (
      <>
        <h3 key={cityIndex}>{city.name}-- Latitude:{city.lat}, Longitude:{city.lon}</h3>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_ACCESS_TOKEN}&q=${this.state.userSearch}&zoom=10`} alt={`A map of ${this.state.userSearch}`}/>
      </>
    ))

    return (
      <>
        <header>
          <h1>Learn About A City</h1>
        </header>
        <main>
          <button onClick={this.handleExplore}>Display City Information</button>
          <form onSubmit={this.handleCitySubmit}>
            <label>Input A City
              <input name="city" type="text" onInput={this.handleCityInput} />
            </label>
            <button type="submit">Explore!</button>
            {this.state.displayCityData ? cityRendered : ''}
            {this.state.renderError && <p>{this.state.errMsg}</p>}
          </form>
          <article>

          </article>

        </main>
      </>
    );
  }
}

export default CityDisplay;
