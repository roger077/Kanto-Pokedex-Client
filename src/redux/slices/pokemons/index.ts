import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'
import axios,{AxiosResponse} from 'axios';
import {Pokemon} from '../../../Interfaces/pokemon.interface'
import {RequestBack} from '../../../Interfaces/requestBack.interface'

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

export const getPokemons=createAsyncThunk<Pokemon[],RequestBack>(
    "pokemon/getPokemons",
    async(reqBack, thunkApi)=>{
        try{
            const {query,order}=reqBack;
            const response : AxiosResponse = await axios.get(`/pokemon?${query}&order=${order.length?order:"num/ASC"}`);
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
            const response:AxiosResponse=await axios.get("/pokemon/"+id)
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
            const response :AxiosResponse = await axios.get("/pokemon/");
            return response.data.Pokemons//.sort((a:Pokemon,b:Pokemon)=>a.num-b.num);
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

        })
        .addCase(getPokemons.fulfilled, (state,action)=>{
            state.pokemons=action.payload;
            state.loading=false;
        })
        .addCase(getPokemons.rejected, (state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        })
        .addCase(getAllPokemons.pending, (state)=>{
            state.loading=true;
        })
        .addCase(getAllPokemons.fulfilled, (state,action)=>{
            state.loading=false;
            state.allPokemons=action.payload;
        })
        .addCase(getAllPokemons.rejected, (state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        })
        .addCase(getPokemonById.pending, (state=>{
            state.loading=true;
        }))
        .addCase(getPokemonById.fulfilled, (state,action)=>{
            state.loading=false;
            state.singlePokemon=action.payload;
        })
        .addCase(getPokemonById.rejected, (state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        });
    }
})

export default pokeSlices.reducer;
export const {setPokemons,sortPokemon,cleanDetails} = pokeSlices.actions