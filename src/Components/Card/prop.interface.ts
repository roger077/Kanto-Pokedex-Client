export default interface Porps{
    id:string,
    name:string,
    hp:number,
    defense:number,
    speed:number,
    height:number,
    attack:number,
    weight:number,
    image:string,
    types:Type[],
}
interface Type{
    id:string,
    name:string,
    url:string
}
