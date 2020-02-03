import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, updateBreed] = useDropdown("Breed", "", breeds);
  const [pets, setsPets] = useState([]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });
    setsPets(animals || []);
    console.log(animals);
  }

  useEffect(() => {
    setBreeds([]);
    updateBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      console.log(breedStrings);
      setBreeds(breedStrings);
    }, console.error);
  }, [animal, setBreeds, updateBreed]);

  return (
    <div className="search-params">
      <form
        onSubmit={ev => {
          ev.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={ev => setLocation(ev.target.value)}
            onBlur={ev => setLocation(ev.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
