import './App.css';
import React from 'react';

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

  render() {

    let cityRendered = this.state.cityData.map((city, cityIndex) => (
      <p key={cityIndex}>{city.name}</p>
    ))

    return (
      <>
        <header>
          <h1>Learn About A City</h1>
        </header>
        <main>
          <button onClick={this.handleExplore}>Display City Information</button>
          {this.state.displayCityData ? cityRendered : ''}
          {this.state.renderError && <p>{this.state.errMsg}</p>}
        </main>
      </>
    );
  }
}

export default CityDisplay;
