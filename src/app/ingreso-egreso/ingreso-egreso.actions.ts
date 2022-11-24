import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.models';
import { IngresoEgresoUID } from './detalle/detalle.component';

export const unSetItems   = createAction('[IngresoEgreso] unSetItems');
export const setItems = createAction(
    '[IngresoEgreso] setItems',
    props<{ items: IngresoEgresoUID[] }>()
);