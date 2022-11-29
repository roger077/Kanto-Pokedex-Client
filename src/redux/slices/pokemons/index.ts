import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import axios,{AxiosResponse} from 'axios';

import {Pokemon} from '../../../Interfaces/pokemon.interface'
import { Order } from '../../../Interfaces/orders.interface';
import {useLocalStorage} from '../../../useLocalStorage'
import {RequestBack} from '../../../Interfaces/requestBack.interface'
//import {RequestBack} from '../requestStorage/index'
interface PokeState {
    pokemons:Pokemon[]  |   null,
    allPokemons:Pokemon[]  |   null,
    loading:boolean,
    singlePokemon: Pokemon | null,
    errors:any
}

export interface porpSortPokemon{
    name:string,
    value:string
}

export const getPokemons=createAsyncThunk<Array<Pokemon>,RequestBack>(
    "pokemon/getPokemons",
    async(reqBack, thunkApi)=>{
        try{
            //const [queryStorage,setQueryStorage]=useLocalStorage<string>('query');
            //setQueryStorage(query);
            const {query,order}=reqBack;
            console.log(query)
            const response : AxiosResponse = await axios.get(`http://localhost:3001/pokemon?${query}&order=${order}`);
            return response.data.Pokemons;
        }catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const getPokemonById=createAsyncThunk<Pokemon,string>(
    "pokemon/getPokemonById",
    async (id,thunkApi)=>{
        try{
            const response:AxiosResponse=await axios.get("http://localhost:3001/pokemon/"+id)
            return response.data.Pokemon
        }catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

export const getAllPokemons=createAsyncThunk<Pokemon[]>(
    "pokemon/getAllPokemons",
    async(_,thunkApi)=>{
        try{
            const response :AxiosResponse = await axios.get("http://localhost:3001/pokemon/");
            return response.data.Pokemons;
        }catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

//export const sortPokemonsByAttack = crea

const initialState : PokeState = {
    pokemons:null,
    allPokemons:null,
    loading:false,
    singlePokemon:null,
    errors:{}
}; 

const pokeSlices = createSlice({
    name:"pokemon",
    initialState,
    reducers:{
        setPokemons:(state, action: PayloadAction<Pokemon[]>) => {
            state.pokemons = action.payload
        },
        setAllPokemons:(state, action: PayloadAction<Pokemon[]>) => {
            state.pokemons = action.payload
        },
        cleanDetails:(state)=>{
            state.singlePokemon=null;
        },
        sortPokemon:(state,action:PayloadAction<porpSortPokemon>)=>{
            const {name,value}=action.payload;
            state.pokemons?.length && value==='AS'?state.pokemons?.sort((a,b)=>{
                if(a[name as keyof Pokemon]>b[name as keyof Pokemon]) return 1
                if(a[name as keyof Pokemon]<b[name as keyof Pokemon]) return -1
                return 0
            }):
            state.pokemons?.sort((a,b)=>{
                if(a[name as keyof Pokemon]>b[name as keyof Pokemon]) return -1
                if(a[name as keyof Pokemon]<b[name as keyof Pokemon]) return 1
                else return 0
            })
        }
    },
    extraReducers(builder){

        builder.addCase(getPokemons.pending, (state)=>{
            state.loading=true;
        }),
        builder.addCase(getPokemons.fulfilled, (state,action)=>{
            state.pokemons=action.payload;
            state.loading=false;
        }),
        builder.addCase(getPokemons.rejected, (state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        }),

        builder.addCase(getAllPokemons.pending, (state)=>{
            state.loading=true;
        }),
        builder.addCase(getAllPokemons.fulfilled, (state,action)=>{
            state.loading=false;
            state.allPokemons=action.payload;
        }),
        builder.addCase(getAllPokemons.rejected, (state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        }),

        builder.addCase(getPokemonById.pending, (state=>{
            state.loading=true;
        })),
        builder.addCase(getPokemonById.fulfilled, (state,action)=>{
            state.loading=false;
            state.singlePokemon=action.payload;
        }),
        builder.addCase(getPokemonById.rejected, (state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        })
    }
})

export default pokeSlices.reducer;
export const {setPokemons,sortPokemon,cleanDetails} = pokeSlices.actions