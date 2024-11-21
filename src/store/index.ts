import { configureStore} from "@reduxjs/toolkit";
import  todoReducer  from "./todoSlice"
import { useDispatch, useSelector } from 'react-redux'

const store = configureStore({
    reducer: {
        todo : todoReducer
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store