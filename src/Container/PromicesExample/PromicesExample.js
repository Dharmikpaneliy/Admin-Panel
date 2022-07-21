import React, { useEffect } from 'react';

function PromicesExample(props) {

    const one = () => {
        return "One Exit"
    }

    const two = () => {
        return new Promise ((resolve, reject) => {
            setTimeout (() => {
                resolve ("Two Exit")
            },2000)
        })        
    }

    const three = () => {
        return "Three Exit"
    }

    const All = async () => {
        const o = one()
        console.log(o);

        const t = await two()
        console.log(t);

        const th = three()
        console.log(th);
    }

    const  display = (z) => {
        console.log(z);
    }

    const sum = (display) => {
        let x=50, y=50;
        let z;
        z=x+y;
        display(z)
    }

    sum(display)

    useEffect (
        () => {
            All()
        },
    [])

    return (
        <div>
            
        </div>
    );
}

export default PromicesExample;