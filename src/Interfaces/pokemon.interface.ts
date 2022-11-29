import {Type} from './type.interface'
export interface Pokemon {
    id:string,
    name:string,
    hp:number,
    defense:number,
    speed:number,
    height:number,
    attack:number,
    weight:number,
    image:string,
    types:Type[]
}

/*export interface Type{
    id:string,
    name:string,
    url:string
}*/