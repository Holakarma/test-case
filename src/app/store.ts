import {configureStore} from "@reduxjs/toolkit";
import {companiesReducer} from "../entities/company";

export const store = configureStore({
    reducer: {companies: companiesReducer}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch