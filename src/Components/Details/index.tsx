import {useEffect} from "react";
import { useParams } from "react-router-dom";
import {Type} from "../../Interfaces/type.interface"
import { useAppDispatch,useAppSelector } from "../../redux/store";
import {getPokemonById,cleanDetails} from '../../redux/slices/pokemons';
import style from './details.module.css'
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

export default function Details(){
    const navigate = useNavigate();
    const dispatch=useAppDispatch();
    const {id}=useParams();
    const {singlePokemon}=useAppSelector((state)=>state.pokemon)

    useEffect(()=>{
        id&&dispatch(getPokemonById(id))
        return ()=>{
            dispatch(cleanDetails())
        }
    },[])

    return(
        singlePokemon?<div className={style.detailContainer}>
            <button className={style.btnBack} onClick={()=>navigate('/home')}>↩</button>
            <div className={style.infoDetailsContainer}>
                <h1>{singlePokemon.name}:</h1>
                <img src={singlePokemon.image}/>
                <div className={style.infoDetail}>
                    <ul>
                        {/* <li><b>Id:</b> {singlePokemon.id}</li> */}
                        {/*<li><b>Name:</b> {singlePokemon.name}</li>*/}
                        <li><b>Attack:</b> {singlePokemon.attack}</li>
                        <li><b>Defense:</b> {singlePokemon.defense}</li>
                        <li><b>HP:</b> {singlePokemon.hp}</li>
                        <li><b>Speed:</b> {singlePokemon.speed}</li>
                        <li><b>Height:</b> {singlePokemon.height}</li>
                        <li><b>Weight:</b> {singlePokemon.weight}</li>
                        <li><b>Types:</b> {singlePokemon.types.map((t:Type)=>t.name.charAt(0).toUpperCase() +t.name.slice(1)).join()}</li>
                    </ul>
                </div>
            </div>
        </div>:<Loading/>
    )
}