import { configureStore, } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import pokemonReducer from './slices/pokemons/index';
import typeReducer from './slices/types/index'
import requestBackReducer from './slices/requestStorage/index'
const store = configureStore({
    reducer:{
        pokemon:pokemonReducer,
        type:typeReducer,
        requestBackStorage: requestBackReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AddDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;