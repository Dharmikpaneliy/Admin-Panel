import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { decrementCounter, incrementCounter } from '../../Redux/Action/Counter.Action';

function Counter(props) {

    const dispatch = useDispatch()
    const counter = useSelector(state => state.counter)

    const handleincrement = () => {
        dispatch(incrementCounter())
    }

    const handledecrement = () => {
        dispatch(decrementCounter())
    }

    return (
        <div>
            <button onClick={()=>handleincrement()}>
                +
            </button>

            <p>
               {counter.counter}
            </p>

            <button onClick={()=>handledecrement()}>
                -
            </button>
        </div>
    );
}

export default Counter;