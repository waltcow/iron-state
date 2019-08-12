export interface Opt<S, R, E> {
    name?: string;
    state: S;
    reducers?: R;
    effects?: E;
}
export declare type StateSelector<S, P> = (state: S) => P;
export interface Reducers<S> {
    [key: string]: ReducerFn<S>;
}
export declare type ReducerFn<S> = (state: S, payload?: any) => any;
export interface Effects {
    [key: string]: EffectFn;
}
export declare type EffectFn = (payload: any) => Promise<any>;
export interface Updater<S> {
    update: (set: any, oldState: S, nextState: S) => any;
    set: any;
}
export interface Action<K> {
    type: string;
    payload: K;
}
export declare function createAction(type: string): <P, R = P>(fn?: (params?: P | undefined, ...args: any[]) => R) => (params?: P | undefined, ...args: any[]) => {
    type: string;
    payload: R;
};
declare function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>): {
    useStore: <P>(selector: StateSelector<S, P>) => P;
    dispatch: (action: Action<any>) => Promise<any>;
    getState: <P>(selector: StateSelector<S, P>) => P;
};
export { createStore };
