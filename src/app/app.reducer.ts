import { ActionReducerMap } from '@ngrx/store';
import * as ui from './Shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as ie from './ingreso-egreso/income-egress.reducer';


export interface AppState {
   ui: ui.State,
   user: auth.State
   // incomeEgress: ie.State
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: ui._uiReducer,
   user: auth._authReducer,
   // incomeEgress: ie._incomeEgressReducer
}