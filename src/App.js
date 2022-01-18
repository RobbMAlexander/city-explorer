import './App.css';
import React from 'react';
import CityDisplay from './CityDisplay';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errMsg: '',
      errRender: false,
    }
  }

 
  render() {

    return (
      <>
        <CityDisplay />

      </>
    );
  }
}



export default App;
