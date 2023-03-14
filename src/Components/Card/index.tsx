import React from 'react'
import style from './card.module.css'
import { Pokemon } from '../../Interfaces/pokemon.interface'
import { useNavigate } from 'react-router-dom'
export default function Card({id,name,hp,defense,speed,height,attack,weight,image,types,num}:Pokemon){
  const navigate=useNavigate()
  const arrNum=num.toString().split('')
  return(
    <div>
        <div className={style.cardContainer} onClick={()=>navigate(`/home/details/${id}`)}>
          <p className={style.infoCard}>
            {`${['0','0','0',...arrNum].slice(arrNum.length).join('')}  ${name}`}
          </p>
          <img src={image}/>
        </div>
    </div>
  )
}