import { useRef, useState } from 'react';
import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import confetty from 'canvas-confetti';

import { Button, Card, Container, Grid, Text, Image } from '@nextui-org/react';

import { Layout } from '../../components/layouts/Layout'
import { PokemonFull } from '../../interfaces/pokemon-full';
import { localFavourites } from '../../utils';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const [isInFavourites, setIsInFavourites] = useState<boolean>(localFavourites.isPokemonInFavourites(pokemon.id));
  const ref = useRef<HTMLButtonElement>(null);

  const onToggleFavourite = () => {
    localFavourites.toggleFavourite(pokemon.id);
    setIsInFavourites(!isInFavourites);

    isInFavourites
      ? ref.current?.blur()
      : handleFavourite();
  };

  const handleFavourite = () => {
    ref.current?.focus();

    confetty({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  };

  return (
    <Layout title={`Pokemon - ${pokemon.name.at(0)?.toLocaleUpperCase()}${pokemon.name.slice(1)}`}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button ref={ref} color="gradient" ghost={!isInFavourites} onPress={onToggleFavourite}>
                {!isInFavourites ? 'Save in favourites' : 'Remove from favorites'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container display="flex" alignItems="center" gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`);

  return {
    paths: pokemons151.map(id => ({ params: { id } })),
    // fallback: false,
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {
      pokemon: await getPokemonInfo(id),
    },
    revalidate: 86400,
  };
};

export default PokemonPage;