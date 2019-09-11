import React from 'react'

interface CounterProps {
    value: number;
    onIncrement(): void
    onDecrement(): void

    onAsyncIncrement(): void
    onAsyncDecrement(): void
}

const Counter: React.FC<CounterProps> = ({ value, onIncrement, onDecrement, onAsyncDecrement, onAsyncIncrement }) => {

    return (
        <p>
            Count: {value} ;
            {' '}
            <button onClick={onIncrement}>
                Increment
            </button>
            {' '}
            <button onClick={onDecrement}>
                Decrement
            </button>
            {' '}
            <button onClick={onAsyncIncrement}>
                AsyncIncrement
            </button>
            {' '}
            <button onClick={onAsyncDecrement}>
                AsyncDecrement
            </button>
        </p>
    )
};

export default Counter;
