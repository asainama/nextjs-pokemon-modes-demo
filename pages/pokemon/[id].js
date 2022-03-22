/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link';
import React from 'react'
import styles from '../../styles/Details.module.css'

export default function Details({pokemon}){

  if(!pokemon){
    return null
  }
  return (
    <div>
     <Head>
       <title>{pokemon.name}</title>
     </Head>
       <div>
         <Link href="/">
          <a>Back to Home</a>
         </Link>
       </div>
       <div className={styles.layout}>
          <div>
            <img
              className={styles.picture}
              src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
              alt={pokemon.name.english}
            />
          </div>
       </div>
       <div>
         <div className={styles.name}>{pokemon.name}</div>
         <div className={styles.type}>{pokemon.type.join(", ")}</div>
         <table>
           <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
           </thead>
           <tbody>
             {pokemon.stats.map(({name, value})=>{
             return ( 
               <tr key={name}>
                <td className={styles.attribute}>{name}</td>
                <td>{value}</td>
               </tr>)
             })}
           </tbody>
         </table>
       </div>
    </div>
  )
}
// context !== params
export async function getStaticProps({params}){
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
    );
    return {
      props:{
        pokemon: await resp.json(),
      },
      revalidate: 30, //la page se mettra à jour toutes les 30 secondes
    }
}

export async function getStaticPaths(){
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json`
    );
    const pokemons =  await(resp.json());

    return {
      paths: pokemons.map((pokemon) => ({
        params: {id: pokemon.id.toString()},
      })),
      fallback: false // pour ne pas avoir de page vide s'il y a pas de pokemon
    };
}