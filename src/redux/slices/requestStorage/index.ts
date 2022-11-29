import React from 'react'
import {useLocalStorage} from '../../../useLocalStorage'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {getItem, setItem} from '../../../useLocalStorage'

interface Order {
    attack?:"ASC"|"DESC",
    defense?:"ASC"|"DESC"
}

export interface RequestBack{
    query: string,
    order: Order
}
//const reqStorage = localStorage.getItem('requestBack')

const initialState : RequestBack = getItem('requestBack')||{
    query:'',
    order:{}
}
//const [reqStorage,setReqStorage]=useLocalStorage<RequestBack>('requestBack',initialState)
//localStorage.setItem('requestBack',JSON.stringify(initialState))

//const reqStorage : RequestBack = JSON.parse(localStorage.getItem('requestBack'))

const requestSlices = createSlice({
    name:"requestBack",
    initialState,
    reducers:{
        setQuery:(state, action: PayloadAction<string>)=>{
            console.log(state)
            localStorage.setItem('requestBack',JSON.stringify({...state,query:action.payload}))
            state.query=action.payload
        },
        setOrder:(state, action: PayloadAction<Order>)=>{
            state.order=action.payload
            localStorage.setItem('requestBack',JSON.stringify({...state,order:action.payload}))

        }
    }
})

export default requestSlices.reducer;
export const {setQuery,setOrder} = requestSlices.actions
