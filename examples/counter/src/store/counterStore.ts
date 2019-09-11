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
