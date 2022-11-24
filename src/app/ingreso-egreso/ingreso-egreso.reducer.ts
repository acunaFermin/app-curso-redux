import { createReducer, on, Action } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoUID } from './detalle/detalle.component';
import { setItems, unSetItems } from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgresoUID[]; 
}

export interface AppStateWithIngresoEgr extends AppState {
    ingresoEgreso: State;
}

export const initialState: State = {
   items: [],
}

const _ingresoEgresoReducer = createReducer(initialState,

    on(setItems, ( state, { items }) => ({ ...state, items:  [...items] })),
    on(unSetItems, state => ({ ...state, items:  [] })),

);

export function ingresoEgresoReducer(state:State | undefined, action:Action) {
    return _ingresoEgresoReducer(state, action);
}