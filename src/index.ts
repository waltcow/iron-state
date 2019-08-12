import { useState, useEffect } from 'react'
import equal from 'fast-deep-equal'
import produce from 'immer'

export interface Opt<S, R, E> {
  name?: string
  state: S
  reducers?: R
  effects?: E
}

export declare type StateSelector<S, P> = (state: S) => P

export interface Reducers<S> {
  [key: string]: ReducerFn<S>
}

export declare type ReducerFn<S> = (state: S, payload?: any) => any

export interface Effects {
  [key: string]: EffectFn
}

export declare type EffectFn = (payload: any) => Promise<any>

export interface Updater<S> {
  update: (set: any, oldState: S, nextState: S) => any
  set: any
}

export interface Action<K> {
  type: string
  payload: K
}

function useMount(mount: any): void {
  useEffect(mount, [])
}

function useUnmount(unmount: any) {
  useEffect(
    () => () => {
      if (unmount) unmount()
    },
    [],
  )
}

const identify = (arg: any) => arg

export function createAction(type: string) {
  return <P, R = P>(fn: (params?: P, ...args: any[]) => R = identify) => (
    params?: P,
    ...args: any[]
  ) => {
    return {
      type,
      payload: fn(params, ...args),
    }
  }
}

function createStore<S, R extends Reducers<S>, E extends Effects>(opt: Opt<S, R, E>) {
  let storeState: S = opt.state
  const updaters: Array<Updater<S>> = []

  function useStore<P>(selector: StateSelector<S, P>) {
    const [state, setState] = useState(() => selector(storeState))

    const update: any = (set: any, oldState: S, nextState: S) => {
      const shouldUpdate = !equal(selector(oldState), selector(nextState))
      if (shouldUpdate) {
        set(() => selector(nextState))
      }
    }

    const updater = {
      update,
      set: setState,
    }

    useMount(() => {
      updaters.push(updater)
    })

    useUnmount(() => {
      updaters.splice(updaters.indexOf(updater), 1)
    })

    return state
  }

  function getState<P>(selector: StateSelector<S, P>) {
    return selector(storeState)
  }

  async function dispatch(action: Action<any>) {
    let result

    const actionName = action.type
    const actionPayload = action.payload

    if (opt.effects && opt.effects[actionName]) {
      result = await opt.effects[actionName](actionPayload)
      return result
    }
    if (!updaters.length) return

    if (!action) return null

    if (opt.reducers) {
      const reducer: ReducerFn<S> = opt.reducers[actionName]
      if (reducer) {
        const nextState: S = produce<S, S>(storeState, (draft: S) => {
          result = reducer(draft, actionPayload)
        })
        const oldState = storeState
        storeState = nextState
        updaters.forEach(updater => {
          updater.update(updater.set, oldState, nextState)
        })
      }
      return result
    }
    return
  }

  return { useStore, dispatch, getState }
}

export { createStore }
