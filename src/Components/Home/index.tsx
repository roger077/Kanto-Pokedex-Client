import React from 'react'
import style from './home.module.css'
import Cards from '../Cards/index'
import Navbar from '../Navbar/index'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { useState } from 'react'
import {getPokemons} from '../../redux/slices/pokemons/index'
import { getTypes } from '../../redux/slices/types'
import Paginado from '../Paginado'
import { useParams } from 'react-router-dom'
import { Pokemon } from '../../Interfaces/pokemon.interface'
import { useLocalStorage } from '../../useLocalStorage'
import { RequestBack } from '../../Interfaces/requestBack.interface'

//import { getItem } from '../../useLocalStorage'

export default function Home(){
    const dispatch=useAppDispatch();

    
    const [pageStorage,setPageStorage]=useLocalStorage<number>('page',1)
    const {pokemons} = useAppSelector((state)=>state.pokemon)
    const [currentPage,setCurrentPage]=useState<number>(pageStorage||1)
  
    const [reqStorage]=useLocalStorage<RequestBack>('requestBack',{query:'', order: ''});   
    
    useEffect(()=>{
        dispatch(getPokemons(reqStorage?reqStorage:{query:'',order:''}))
        dispatch(getTypes())  
            
    },[])

    useEffect(()=>{
        setPageStorage(currentPage)
    },[currentPage])

    const paginado = (page:number): void =>{
        setCurrentPage(page)
    }

    const pokemonsPerPage=9
    const lastIndexCountries=currentPage*pokemonsPerPage;
    const firstIndexCountries = lastIndexCountries-pokemonsPerPage;

    return(
        pokemons?.length&&<div className={style.homeContainer}>
            <Navbar paginado={paginado}/>
            <Cards currentPokemons={pokemons.slice(firstIndexCountries,lastIndexCountries) }/>
            <Paginado 
                currentPage={currentPage} 
                countPokemons={pokemons.length} 
                PokemonsPerPage={pokemonsPerPage} 
                paginado={paginado}
            />
        </div>||<p>Loading...</p>
    )
}