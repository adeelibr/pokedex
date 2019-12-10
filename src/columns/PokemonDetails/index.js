// Renders the profile and games of a single pokemon
import React from 'react'
import { Spinner } from '@nice-boys/components'
import PokemonProfile from '../../components/PokemonProfile'
import PokemonGamesSection from '../../components/PokemonGamesSection'
import Column from '../../components/Column'
import { fetchPokemonGames, fetchPokemonByName } from '../../api/pokeapi'

import useAsync from '../useAsync'

function PokemonGames (props) {
  const callback = React.useCallback(
    () =>
      fetchPokemonGames(
        props.pokemon.game_indices.map(game => game.version.name)
      ),
    [props.pokemon]
  )

  const { data: games } = useAsync(callback)

  return !games ? <Spinner /> : <PokemonGamesSection games={games} />
}

function Pokemon (props) {
  const api = React.useCallback(() => fetchPokemonByName(props.name), [
    props.name
  ])
  const { data: pokemon } = useAsync(api)

  return (
    <Column width={1} p={4}>
      {pokemon ? (
        <>
          <PokemonProfile pokemon={pokemon} />
          <PokemonGames pokemon={pokemon} />
        </>
      ) : (
        <div>No pokemon selected.</div>
      )}
    </Column>
  )
}

export default Pokemon
