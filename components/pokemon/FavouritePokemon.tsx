import { Grid } from "@nextui-org/react";
import { MouseEvent, RefObject } from "react";
import { PokemonFull } from "../../interfaces";
import { FavouriteCardPokemon } from "./FavouriteCardPokemon";

interface Props {
  favorites: PokemonFull[];
  onRemovePokemon: (event: MouseEvent<HTMLElement>, id: number, ref: RefObject<HTMLDivElement>) => void;
}

export const FavouritePokemon = ({ favorites, onRemovePokemon }: Props) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {
        favorites.map(pokemon => (
          <FavouriteCardPokemon pokemon={pokemon} key={pokemon.id} onRemovePokemon={onRemovePokemon} />
        ))
      }
    </Grid.Container>
  );
};
