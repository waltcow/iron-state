# Iron-state

React state management library based on Hooks and typescript

## Installation

```sh
yarn add iron-state
```

## Quick Start

> create store

```ts

import {createAction, createStore, ReducerFn, EffectFn} from 'iron-state'

export enum ReducerActionType {
    increment = "increment",
    decrement = "decrement"
}

export enum EffectActionType {
    asyncIncrement = "asyncIncrement",
    asyncDecrement = "asyncDecrement"
}

interface CounterState {
    count: number
}

type CounterReducer = Record<ReducerActionType, ReducerFn<CounterState>>;

type CounterEffect = Record<EffectActionType, EffectFn>;

const actions = {
    increment: createAction(ReducerActionType.increment)<number>(),
    decrement: createAction(ReducerActionType.decrement)<number>(),
    asyncIncrement: createAction(EffectActionType.asyncIncrement)(),
    asyncDecrement: createAction(EffectActionType.asyncDecrement)(),
};

const { useStore, dispatch } = createStore<CounterState, CounterReducer, CounterEffect>({
    state: {
        count: 0,
    },
    reducers: {
        [ReducerActionType.increment](state, value) {
            state.count = state.count + value
        },
        [ReducerActionType.decrement](state, value) {
            state.count = state.count - value
        },
    },
    effects: {
        async [EffectActionType.asyncIncrement]() {
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            });
            await dispatch(actions.increment(1))
        },

        async [EffectActionType.asyncDecrement]() {
            await new Promise(resolve => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            });
            await dispatch(actions.decrement(1))
        },
    },
});

export {
    useStore,
    dispatch,
    actions
}
```

>  use store in view

```tsx

import { useStore, dispatch, actions } from './store/counterStore'
 
const App = () => {
  const count = useStore(s => s.count)

  return (
    <div>
      <span>{count}</span>
      <button onClick={() => dispatch(actions.decrement(1))}>-</button>
      <button onClick={() => dispatch(actions.increment(1))}>+</button>
      <button onClick={() => dispatch(actions.asyncIncrement(1)}>async+</button>
    </div>
  )
}

```


