// 'use strict';

import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class WeatherLI extends React.Component {
  render(

  ) {
    return (
      <ListGroup.Item>
        On {this.props.date}, expect {this.props.description} with a high of {this.props.dayHigh} and a low of {this.props.dayLow}.
      </ListGroup.Item>
    )
  }
}

export default WeatherLI;
