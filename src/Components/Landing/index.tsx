import React from 'react'
import imgTitle from './imgTitle.png'
import style from './landing.module.css'
import {Link} from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from '../../useLocalStorage'
import { RequestBack } from '../../redux/slices/requestStorage'

//import { Order } from '../../Interfaces/orders.interface'

export default function Landing(){
    //const {query}=useParams();
    //localStorage.setItem('query','')
    //const queries: string = localStorage.getItem('query') || ''
   // const [orderStorage] = useLocalStorage<Order>('order',{})
    /*const [reqStorage,setReqStorage]=useLocalStorage<RequestBack>('requestBack',{
        query:'',
        order:{}
    })*/
    return(
        <div className={style.container}>
            <div className={style.imgContainer}>
                <div>
                    <img src={imgTitle}/>
                    <Link to={`/home`}>
                        <button className={style.btnEnter}>Start</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}