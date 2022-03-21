/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Link from 'next/link';
import React,{ useEffect, useState } from 'react'
import styles from '../../styles/Details.module.css'
import { useRouter } from "next/router"

export default function Details(){
  const {
    query: {id},
  } = useRouter();

  const [pokemon, setPokemon] = useState(null);
  useEffect(()=>{
    async function getPokemon(){
      const resp = await fetch(
        `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
        );
        setPokemon(await resp.json());
    }
    if(id) getPokemon();
  },[id])

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