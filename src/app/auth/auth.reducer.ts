import { createReducer, on } from '@ngrx/store';
import { User } from '../Models/user.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
    user: User | null; 
}

export const initialState: State = {
   user: null,
}

export const _authReducer = createReducer(initialState,

    on(setUser, (state, {user}) => ({ ...state, user: {...user} })),
    on(unSetUser, state => ({ ...state, user: null })),

);