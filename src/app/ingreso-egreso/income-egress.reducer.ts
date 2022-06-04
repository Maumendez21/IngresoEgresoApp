import { createReducer, on } from '@ngrx/store';
import { IncomeEgress } from '../Models/ingresos-egresos.model';
import { setItems, unSetItems } from './income-egress.action';

export interface State {
    items: IncomeEgress[]; 
}

export const initialState: State = {
   items: [],
}

export const _incomeEgressReducer = createReducer(initialState,

    on(setItems, (state, {items}) => ({ ...state, items: [...items]})),
    on(unSetItems, state => ({ ...state, items: []})),

);