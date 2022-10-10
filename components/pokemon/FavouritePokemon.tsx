import { Card, Grid } from "@nextui-org/react";
import { FavouriteCardPokemon } from "./FavouriteCardPokemon";

interface Props {
  favorites: number[];
}

export const FavouritePokemon = ({ favorites }: Props) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {
        favorites.map(id => (
          <FavouriteCardPokemon id={id} key={id} />
        ))
      }
    </Grid.Container>
  );
};
