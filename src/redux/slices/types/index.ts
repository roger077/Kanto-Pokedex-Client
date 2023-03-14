import { Type } from "../../../Interfaces/type.interface";
import axios,{AxiosResponse} from 'axios';
import {createSlice,createAsyncThunk,PayloadAction} from '@reduxjs/toolkit'

interface TypeState{
    types: Type[] | null,
    loading:boolean,
    errors:any 
}

const initialState : TypeState={
    types:null,
    loading:false,
    errors:{}
}

export const getTypes=createAsyncThunk<Type[]>(
    "type/getTypes",
    async(_,thunkApi)=>{
        try{
            const response :AxiosResponse = await axios.get("/type/");
            return response.data.Types;
        }catch(error){
            return thunkApi.rejectWithValue(error)
        }
    }
)

const typesSlices = createSlice({
    name:"type",
    initialState,
    reducers:{
        setTypes:(state,action: PayloadAction<Type[]>)=>{
            state.types=action.payload
        }
    },
    extraReducers(builder){
        builder.addCase(getTypes.pending, (state)=>{
            state.loading=true;
        })
        .addCase(getTypes.fulfilled, (state,action)=>{
            state.types=action.payload;
            state.loading=false;
        })
        .addCase(getTypes.rejected, (state,action)=>{
            state.loading=false;
            state.errors=action.payload;
        })
    }
})

export default typesSlices.reducer