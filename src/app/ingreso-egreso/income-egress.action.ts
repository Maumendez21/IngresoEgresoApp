import { createAction, props } from '@ngrx/store';
import { IncomeEgress } from '../Models/ingresos-egresos.model';

export const setItems = createAction(
    '[IncomeEgress] setItems',
    props<{items: IncomeEgress[]}>()
);


export const unSetItems = createAction('[IncomeEgress] unSetItems');