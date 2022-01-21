import React from "react";
import { CarouselItem, CarouselCaption } from "react-bootstrap";


class MoviesCards extends React.Component {
  render(

  ) {
    return (
    <CarouselItem>
    <img
      className="d-block w-100"
      src={this.props.src}
      alt={this.props.title}
    />
    <CarouselCaption>
      <h3>{this.props.title}</h3>
      <p>{this.props.description}</p>
    </CarouselCaption>
    </CarouselItem>
    )
  }
}

export default MoviesCards;
