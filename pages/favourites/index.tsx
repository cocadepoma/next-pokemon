import { Card, Container, Grid, Image, Text } from '@nextui-org/react';
import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts/Layout';
import { FavouritePokemon } from '../../components/pokemon/';
import { NoFavourites } from '../../components/ui/NoFavourites';
import { localFavourites } from '../../utils';

interface Props {
  pokemons: any;
}

const FavouritesPage: NextPage<Props> = () => {
  const [favouritePokemons, setFavouritePokemons] = useState<number[]>([]);

  useEffect(() => {
    const favouritePokemons = localFavourites.getPokemons();
    setFavouritePokemons(favouritePokemons)
  }, []);


  return (
    <Layout title="Favourites Pokemons">
      {
        favouritePokemons.length === 0
          ? <NoFavourites />
          : <FavouritePokemon favorites={favouritePokemons} />
      }
    </Layout>
  );
};

export default FavouritesPage;
