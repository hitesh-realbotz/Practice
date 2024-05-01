import { useState, useEffect } from "react";
import useLocalStorage from "../custom-hook/useLocalStorage";


const CounterComponent = (props) => {

    const defaultValue = 0;

    const {isMasterReset} = props;
    const [count, setCount] = useLocalStorage('count', defaultValue);
    const [errorMessage, setErroMessage] = useState('');

    const handleIncrement = () => {
        setCount(count + 1);
        if (!count) setErroMessage('');
    };
    const handleDecrement = () => {
        if (!!count) setCount(count - 1);
        else setErroMessage('Count already set to 0!');
    };

    const handleReset = () => {
        setCount(defaultValue);
        setErroMessage('');
    };

    useEffect(() => {
        setCount(defaultValue);
        }, [isMasterReset]);

    return (
        <div>
            <h1>Count, {count}!</h1>
            {errorMessage ? <span>{errorMessage}</span> : ''}
            <div>
                <button onClick={handleIncrement}>Increment</button>
                <button onClick={handleDecrement}>Decrement</button>
                <button onClick={handleReset}>Reset Counter</button>
            </div>
        </div>
    );
}
export default CounterComponent;