import React from "react";
import pet from "@frontendmasters/pet";

class Details extends React.Component {
  constructor() {
    super();
    //Pet Data
    this.state = {
      loading: true
    };
  }
  componentDidMount() {
    //Makes API request using Pet ID then sets the component state with pet data.
    pet.animal(this.props.id).then(({ animal }) => {
      console.log(animal);
      this.setState({
        loading: false,
        name: animal.name,
        description: animal.description,
        breed: animal.breeds.primary,
        animal: animal.type,
        location: `${animal.contact.address.state}, ${animal.contact.address.city}`,
        media: animal.photos
      });
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>loading ...</h1>;
    }
    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      thumbnail
    } = this.state;

    return (
      <div className="details">
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
export default Details;
