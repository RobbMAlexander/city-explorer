import React from "react";
import MoviesCards from './Movies';
import Carousel from "react-bootstrap/Carousel";

class Movies extends React.Component {
  render(

  ) {
    let movieCardDisplay = this.props.data.map((data, index) => {
      return (
        <MoviesCards
          key={index}
          src={data.image_url}
          title={data.title}
          description={data.description}
        />
      )
    })
    return (
      <Carousel fade>
        {movieCardDisplay}
      </Carousel>
    )
  }
}

export default Movies;
