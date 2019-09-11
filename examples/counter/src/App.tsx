import React from 'react';
import Counter from './components/counter';
import {useStore, dispatch, actions} from "./store/counterStore";

const App: React.FC = () => {

  const count = useStore(S => S.count);

  return (
      <Counter value={count}
               onAsyncIncrement={() => dispatch(actions.asyncIncrement())}
               onAsyncDecrement={() => dispatch(actions.asyncDecrement())}
               onDecrement={() => dispatch(actions.decrement(1))}
               onIncrement={() => dispatch(actions.increment(1))}
      />
  )
}

export default App;
