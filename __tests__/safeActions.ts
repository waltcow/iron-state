import {createStore, createAction } from '../src/index'

test('type safe action', async () => {

    enum ActionTypes {
        increment = "increment",
        decrement = "decrement",
        asyncIncrement = "asyncIncrement"
    }

    const actions = {
        increment: createAction(ActionTypes.increment)<number>(),
        decrement: createAction(ActionTypes.decrement)<string>(),
        asyncIncrement: createAction(ActionTypes.asyncIncrement)(),
    };

    const { useStore, dispatch, getState } = createStore({
        state: {
            count: 1,
        },
        reducers: {
            [ActionTypes.increment](state, payload: any = 1) {
                state.count += payload
            },
            [ActionTypes.decrement](state)   {
                state.count--
            },
        },
        effects: {
            async [ActionTypes.asyncIncrement]() {
                await new Promise(resolve => {
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                });
                dispatch(actions.increment(1))
            },
        }
    });

    console.log(useStore);

    await dispatch(actions.increment(2));

    let count = getState(s => s.count);

    expect(count).toBe(2)

});
