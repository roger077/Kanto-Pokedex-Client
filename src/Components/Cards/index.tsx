import React from 'react';
import Card from '../Card/index';
import { Pokemon } from '../../Interfaces/pokemon.interface';
import style from './cards.module.css'

interface Props{
    currentPokemons: Pokemon[]|null,
}
export default function Cards({currentPokemons}:Props){
    currentPokemons&&console.log(currentPokemons)
    
    return (
        <div className={style.container}>
            {
                currentPokemons?.length&&currentPokemons.map(poke=><Card
                    key={poke.id} 
                    id={poke.id}
                    name={poke.name} 
                    hp={poke.hp} 
                    defense={poke.defense}
                    speed={poke.speed}
                    height={poke.height}
                    attack={poke.attack}
                    weight={poke.weight}
                    image={poke.image}
                    types={poke.types}
                />)
            }
        </div>
    )
    
}
