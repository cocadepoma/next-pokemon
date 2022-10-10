/* eslint-disable import/no-anonymous-default-export */
const toggleFavourite = (id: number): void => {
  let favourites: number[] = JSON.parse(localStorage.getItem('favourites') || '[]');

  if (favourites.includes(id)) {
    favourites = favourites.filter(pokeId => pokeId !== id);
  } else {
    favourites.push(id);
  }

  localStorage.setItem('favourites', JSON.stringify(favourites));
};

const isPokemonInFavourites = (id: number): boolean => {
  if (typeof window === 'undefined') return false;

  let favourites: number[] = JSON.parse(localStorage.getItem('favourites') || '[]');

  return favourites.includes(id);
};

const getPokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favourites') || '[]');
};

export default {
  toggleFavourite,
  isPokemonInFavourites,
  getPokemons,
}