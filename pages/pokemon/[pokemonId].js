import Image from "next/image"
import Link from "next/link"

import styles from "../../styles/Pokemon.module.css"

import { useRouter } from "next/router"

export const getStaticPaths = async () => {
  const maxPokemons = 251
  const api = `https://pokeapi.co/api/v2/pokemon/`

  const res = await fetch(`${api}/?limit=${maxPokemons}`)
  const data = await res.json()

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: (index + 1).toString() },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.pokemonId

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

  const data = await res.json()

  return {
    props: { pokemon: data },
  }
}

export default function Pokemon({ pokemon }) {
  const router = useRouter()

  if (router.isFallback) {
    return <h1>Carregando...</h1>
  }

  return (
    <div
      className={`${styles.pokemon_container} ${
        styles["type_" + pokemon.types[0].type.name]
      }`}
    >
      <h1 className={styles.title}>{pokemon.name}</h1>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        width="200"
        height="200"
        alt={pokemon.name}
      />
      <div className={styles.navigation}>
       <Link href={
        pokemon.id === 1 ? `http://localhost:3000/pokemon/999`
        : `http://localhost:3000/pokemon/${pokemon.id - 1}`}>
        Anterior
       </Link>      
       <Link href={`http://localhost:3000/pokemon/${pokemon.id + 1}`}>
        Proximo
       </Link>      
      </div>
      <div>
        <p>
          <strong>Número:</strong>
        </p>
        <p>#{pokemon.id}</p>
      </div>
      <div>
        <p>
          <strong>Tipo:</strong>
        </p>
        <div className={styles.type_container}>
          {pokemon.types.map((item, index) => (
            <span
              className={`${styles.type} ${styles["type_" + item.type.name]}`}
              key={index}
            >
              {item.type.name}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.data_container}>
        <div className={styles.data_height}>
          <p>
            <strong>Altura:</strong>
          </p>
          <p>{pokemon.height * 10}cm</p>
        </div>
        <div className={styles.data_weight}>
          <p>
            <strong>Peso:</strong>
          </p>
          <p>{pokemon.weight / 10}kg</p>
        </div>
      </div>
    </div>
  )
}
