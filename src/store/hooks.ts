import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from './configureStore';
import {
  EntityReducerActionState,
  EntityReducerState,
  EntityReducerStateAction,
  ReduxActionParameters,
} from '@declarations/shared';
import {AnyAction} from 'redux';

interface TypedUseQueryHook<TState> {
  <TSelected, TEntity>(
    action: (args: ReduxActionParameters<TEntity>) => AnyAction,
    method: EntityReducerStateAction,
    selector: (state: TState) => {data: TSelected; state: EntityReducerState},
  ): {query: (args?: ReduxActionParameters<TEntity>) => AnyAction; data: TSelected; state?: EntityReducerActionState};
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useQuery: TypedUseQueryHook<RootState> = (action, method, selector) => {
  const dispatch = useDispatch<AppDispatch>();

  const dataSelector = (state: RootState) => {
    const reducerEntity = selector(state);
    return reducerEntity.data;
  };
  const stateSelector = (state: RootState) => {
    const reducerEntity = selector(state);
    return reducerEntity.state[method];
  };
  const data = useSelector(dataSelector);
  const state = useSelector(stateSelector);

  const query = (args: any) => dispatch(action(args || {}));

  return {query, data, state};
};
