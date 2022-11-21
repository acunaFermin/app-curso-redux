import { Action, createReducer, on } from '@ngrx/store';
import { isLoading, stopLoading } from './ui.actions';

export interface State  {
    isLoading: boolean; 
}

export const initialState: State | undefined = {
   isLoading: false ,
}

const _uiReducer = createReducer(initialState ,

    on(isLoading,   state => ({ ...state, isLoading: true})),
    on(stopLoading, state => ({ ...state, isLoading: false})),

);


//OJO con el undefined "state:State | undefined", si no esta provoca un error de typescript
export function uiReducer(state:State | undefined, action:Action): State{
    return _uiReducer(state, action);
}