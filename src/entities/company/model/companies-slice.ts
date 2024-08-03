import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import companies from "../lib/companies-generator";
import {generateID} from "shared/lib";

export interface Company {
    readonly id: string,
    name: string,
    address: string,
}

interface CompaniesState {
    companies: Company[]
}

const initialState: CompaniesState = {
    companies,
}

const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        addCompany: (state, action: PayloadAction<Omit<Company, 'id'>>) => {
            state.companies.unshift({...action.payload, id: generateID()});
        },
        deleteCompany: (state, action: PayloadAction<string>) => {
            const index = companies.findIndex(c => c.id === action.payload)
            if (index !== -1) {
                state.companies.splice(index, 1);
            }
        },
        deleteCompanies: (state, action: PayloadAction<string[]>) => {
            action.payload.forEach(
                id => {
                    const idToDelete = state.companies.findIndex(c => c.id === id);
                    if (idToDelete !== -1) {
                        state.companies.splice(idToDelete, 1);
                    }
                }
            )
        },
        editCompany: (state, action: PayloadAction<Partial<Company>>) => {
            const index = state.companies.findIndex(company => company.id === action.payload.id);
            if (index !== -1) {
                state.companies[index] = action.payload;
            }
        }
    },
})

export const {addCompany, deleteCompany, deleteCompanies, editCompany} = companiesSlice.actions
export const {reducer: companiesReducer} = companiesSlice