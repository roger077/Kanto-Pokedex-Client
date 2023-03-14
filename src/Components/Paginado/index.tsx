import React from 'react';
import style from './paginado.module.css'

interface Props{
    currentPage:number,
    countPokemons:number,
    PokemonsPerPage:number,
    paginado: (page:number)=>void
}

export default function Paginado({currentPage,countPokemons,PokemonsPerPage,paginado}:Props){
    let pageNumbers=[]
    for(let i=0;i<Math.ceil(countPokemons/PokemonsPerPage);i++) pageNumbers.push(i);
    return(
        <div  className={style.paginadoContainer}>
            <input
                key='retro'
                type='button' 
                className={style.currentPag} 
                onClick={()=>{
                    if(currentPage>1)
                        paginado(currentPage-1)
                    }
                } 
                value={'🡨'}
            />
            {
                pageNumbers.map(
                    p=><input
                        type='button' 
                        className={currentPage===p+1?style.currentPagSelect:style.currentPag} 
                        key={p} 
                        onClick={
                            ()=>paginado(p+1)
                        } 
                        value={p+1} 
                    />
                )
            }
            <input
                key='next'
                type='button' 
                className={style.currentPag} 
                onClick={()=>{
                    if(currentPage<countPokemons/PokemonsPerPage)
                        paginado(currentPage+1)
                    }
                } 
                value={'🡪'}                
            />
        </div>
    )
}