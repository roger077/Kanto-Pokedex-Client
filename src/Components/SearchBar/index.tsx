import React, { useEffect, useState } from "react";
import style from './searchBar.module.css'
import {ChangeEvent} from 'react'
import { Queries } from '../../Interfaces/queries.interface'
import { useAppDispatch } from '../../redux/store'
import {getPokemons} from '../../redux/slices/pokemons/index'
import {setItem,getItem} from '../../useLocalStorage'


interface Props{
    handleQuery:(event: ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>void;
    queries?:Queries;
    paginado: (page:number)=> void;
}

export default function SearchBar({handleQuery,queries,paginado}:Props){

    const dispatch = useAppDispatch();
    const reqStorage=getItem('requestBack')
    
    const handleClick=():void=>{
        const strQueries:Array<string>=[]
        for (const key in queries) {
            strQueries.push(`${key}=${queries[key as keyof Queries]}`)
        }
        const query = strQueries.join('&')
        paginado(1)
        console.log(reqStorage)
        setItem('requestBack',{...reqStorage,query:query})
        dispatch(getPokemons({...reqStorage,query:query}))
    }

    return(
        <div className={style.searchContainer}>
        <input className={style.inpSearch} name="name" onChange={handleQuery} type='text' placeholder='Pokemon...'/>
        <button className={style.btnSearch} onClick={handleClick} >Search</button>
    </div>
    )
}