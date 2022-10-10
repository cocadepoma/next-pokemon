import type { NextPage } from 'next'
import { MouseEvent, RefObject, useEffect, useState } from 'react';
import { Layout } from '../../components/layouts/Layout';
import { FavouritePokemon } from '../../components/pokemon/';
import { NoFavourites } from '../../components/ui/NoFavourites';
import { localFavourites } from '../../utils';
import { getPokemonInfo } from '../../utils/getPokemonInfo';
import { PokemonFull } from '../../interfaces/pokemon-full';

interface Props {
  pokemons: any;
}

const FavouritesPage: NextPage<Props> = () => {
  const [favouritePokemons, setFavouritePokemons] = useState<PokemonFull[]>([]);

  useEffect(() => {
    const favouritePokemons = localFavourites.getPokemons();
    getPokemons(favouritePokemons);
  }, []);

  const getPokemons = async (favouritePokemons: number[]) => {
    const promises: any[] = [];
    favouritePokemons.forEach(pokemon => {
      promises.push(getPokemonInfo(`${pokemon}`));
    })
    const responses = await Promise.all(promises);

    setFavouritePokemons(responses);
  };

  const onRemovePokemon = async (event: MouseEvent<HTMLElement>, id: number, ref: RefObject<HTMLDivElement>) => {
    event.stopPropagation();
    ref.current?.parentElement?.classList.add('animate-card');

    await new Promise(res => setTimeout(res, 400));

    const newPokemons = favouritePokemons.filter(pokemon => pokemon.id !== id);
    setFavouritePokemons(newPokemons);

    localFavourites.toggleFavourite(id);
  };

  return (
    <Layout title="Favourites Pokemons">
      {
        favouritePokemons.length === 0
          ? <NoFavourites />
          : <FavouritePokemon favorites={favouritePokemons} onRemovePokemon={onRemovePokemon} />
      }
    </Layout>
  );
};

export default FavouritesPage;
