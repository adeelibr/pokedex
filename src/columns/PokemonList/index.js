// Renders the sidebar with the list of pokemons in the pokedex
import React from 'react'
import { Link } from '@primer/components'
import Sidebar from '../../components/Sidebar'
import SidebarItem from '../../components/SidebarItem'
import SidebarTitle from '../../components/SidebarTitle'
import { fetchPokemons } from '../../api/pokeapi'

// import useAsync from '../useAsync'
// import createResource from '../createResource'

const usePokemons = () => {
  const [data, setData] = React.useState(null)
  const [status, setStatus] = React.useState('idle')
  React.useEffect(() => {
    fetchPokemons()
      .then(pokemons => {
        setData(pokemons)
        setStatus('completed')
      })
      .catch(err => {
        setStatus('error')
      })
  })
  return { data, status }
}

// Example #3
// const resource = createResource(fetchPokemons())

const PokemonList = props => {
  // Example #1
  const { data: pokemons } = usePokemons()
  // Example #2
  // const api = React.useCallback(() => fetchPokemons(), []);
  // const { data: pokemons } = useAsync(api)
  // Example #3
  // const pokemons = resource.read()

  return (
    <Sidebar>
      <Link onClick={() => props.setSelectedPokemon(null)}>
        <SidebarTitle>Pokedex</SidebarTitle>
      </Link>
      {pokemons && pokemons.length > 0 ? (
        pokemons.map(pokemon => (
          <Link
            key={pokemon.name}
            onClick={() => props.setSelectedPokemon(pokemon.name)}
          >
            <SidebarItem>{pokemon.name}</SidebarItem>
          </Link>
        ))
      ) : (
        <div>Loading ..</div>
      )}
    </Sidebar>
  )
}

export default PokemonList
