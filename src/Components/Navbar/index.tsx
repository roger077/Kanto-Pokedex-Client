import React, { ChangeEvent } from 'react'
import style from './navbar.module.css';
import imgTitle from './imgTitle.png';
import SearchBar from '../SearchBar/index';
import { useState } from 'react';
import { getPokemons } from '../../redux/slices/pokemons';
import {  useAppSelector } from "../../redux/store";
import { Queries } from '../../Interfaces/queries.interface';
import { useAppDispatch } from '../../redux/store';
import { useNavigate } from "react-router-dom";
import {setItem,getItem} from '../../useLocalStorage';


interface Props{
    paginado: (page:number)=> void
}

export default function Navbar({paginado}:Props){
    const dispatch = useAppDispatch();
    const navigate=useNavigate();
    const [queries,setQueries]=useState<Queries>({});
    const requestBack = getItem('requestBack')

    const handleQuery = (event: ChangeEvent<HTMLInputElement|HTMLSelectElement>):void=>{
        setQueries({...queries,[event.target.name]:event.target.value})
    }
    
    const handleSort=(event: ChangeEvent<HTMLSelectElement>):void=>{
        const order={
            name:event.target.name,
            value:event.target.value
        }

        setItem('requestBack',{...requestBack,order:`${order.name}/${order.value}`})
        dispatch(getPokemons({...requestBack,order:`${order.name}/${order.value}`}))
        paginado(1)
    }

    const {types}= useAppSelector((state)=>state.type)
    return(
        
        <div className={style.navbar}>
            <img 
                onClick={
                    ()=>{
                        navigate('/home')
                        setItem('requestBack',{query:'',order:''})
                        dispatch(getPokemons({query:'',order:''}))
                        paginado(1)
                    }
                } 
                className={style.imgTitle} 
                src={imgTitle}
            />
            <SearchBar queries={queries} handleQuery={handleQuery} paginado={paginado} />
            <select name='types' onChange={handleQuery}>
                <option value=''>Filter by type</option>
                {
                    types?.length&&types.map(type=><option id={type.id} value={type.name}>{type.name}</option>)
                }
            </select>   
            <select onChange={handleSort} name='defense'>
                <option value=''>Order by defense</option>
                <option value='ASC'>Ascending</option>
                <option value='DESC'>Descending</option>
            </select>      
            <select onChange={handleSort} name='attack'>
                <option value=''>Order by attack</option>
                <option value='ASC'>Ascending</option>
                <option value='DESC'>Descending</option>
            </select>      
        </div>
    )
}