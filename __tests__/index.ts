//
// import { createStore } from '../src/index'
//
// test('useStore', () => {
//
//     enum ReducerTypes {
//         increment,
//         decrement
//     }
//
//     const { useStore, dispatch, dispatchA } = createStore({
//         state: {
//             count: 1,
//         },
//         reducers: {
//             [ReducerTypes.increment](state, payload: any = 1) {
//                 state.count += payload
//             },
//             [ReducerTypes.decrement](state) {
//                 state.count--
//             },
//         },
//         effects: {
//             async asyncIncrement() {
//                 await new Promise(resolve => {
//                     setTimeout(() => {
//                         resolve()
//                     }, 1000)
//                 });
//                 dispatch(ReducerTypes.increment)
//                 dispatchA()
//             },
//         },
//     })
//
//     console.log(useStore)
// })
