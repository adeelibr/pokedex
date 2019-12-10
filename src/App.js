// The <App /> component is responsible for rendering the two main columns
import React from 'react'
import { BaseStyles } from '@primer/components'
import { Flex } from '@primer/components'

const PokemonList = React.lazy(() =>
  import('./columns/PokemonList' /* webpackChunkName: "PokemonList" */)
)
const PokemonDetails = React.lazy(() =>
  import('./columns/PokemonDetails' /* webpackChunkName: "PokemonDetails" */)
)

const App = () => {
  const [name, setName] = React.useState(null)
  const setSelectedPokemon = newName => {
    setName(newName)
  }
  React.useEffect(
    () => {
      document.title = `${name ? `${name} | ` : ''}Pokedex`
    },
    [name]
  )
  return (
    <BaseStyles>
      <Flex>
        <React.Suspense fallback={<p>Loading list ..</p>}>
          <PokemonList setSelectedPokemon={setSelectedPokemon} />
        </React.Suspense>
        <React.Suspense fallback={<p>Loading details ..</p>}>
          <PokemonDetails name={name} />
        </React.Suspense>
      </Flex>
    </BaseStyles>
  )
}

export default App
