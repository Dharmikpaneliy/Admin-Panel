import React, { useMemo, useState } from 'react';

function UsememoExample(props) {

    const [number, setNumber] = useState(0);
    const [counter, setCounter] = useState(0);

    const findFactorial = (n) => {
        console.log("findFactorial Called");
        if (n>1) {
            return n * findFactorial(n-1);
        } else {
            return 1;       
        }
    }

    // const result = findFactorial(number);

    const result = useMemo(()=> {return findFactorial(number)}, [number]);

    return (
        <div>
            <input type="text" placeholder='Please Enter your Number' onChange={(e) => {setNumber(e.target.value)}} />
            <button type='submit' onClick={()=>setCounter(counter + 1)}>counter</button>

            <p>Counter Value Is :- {counter} </p>
            <p>Factorial Value Is :- {result} </p>

        </div>
    );
}

export default UsememoExample;