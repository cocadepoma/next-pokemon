import { useRouter } from 'next/router';
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { PokemonFull } from '../../interfaces/pokemon-full';
import { TrashIcon } from '../icons/TrashIcon';
import { MouseEvent, RefObject, useRef } from 'react';

interface Props {
  pokemon: PokemonFull,
  onRemovePokemon: (event: MouseEvent<HTMLElement>, id: number, ref: RefObject<HTMLDivElement>) => void;
}

export const FavouriteCardPokemon = ({ pokemon, onRemovePokemon }: Props) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const onPokemonClick = () => {
    router.push(`/name/${pokemon.name}`);
  };

  return (
    <Grid xs={6} sm={3} md={2} xl={1}>
      <Card isHoverable isPressable css={{ padding: '15px 15px 5px 15px' }} onClick={onPokemonClick} ref={ref}>
        <button className="custom-button" onClick={(event) => onRemovePokemon(event, pokemon.id, ref)}>
          <TrashIcon fill="currentColor" filled size={22} />
        </button>
        <Card.Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
          width="100%"
          height={120}
        />
        <Card.Footer>
          <Row justify="space-between">
            <Text transform='capitalize'>{pokemon.name}</Text>
            <Text># {pokemon.id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};


