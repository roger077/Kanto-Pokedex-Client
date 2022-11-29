import React from 'react'
import style from './card.module.css'
import { Pokemon } from '../../Interfaces/pokemon.interface'
import { useNavigate } from 'react-router-dom'
export default function Card({id,name,hp,defense,speed,height,attack,weight,image,types}:Pokemon){
  const navigate=useNavigate()
  return(
    <div>
        <div className={style.cardContainer} onClick={()=>navigate(`/home/details/${id}`)}>
          <img src={image}></img>
          <ul>
            <li className={style.pName}>
              NAME: { name.toUpperCase()}
            </li>
            <li>
              TYPES: { types.map(p=>p.name.toUpperCase()).join(', ')}
            </li>
          </ul>           
        </div>
    </div>
  )
}