import React, { useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Listitem from './Listitem';

function UsecallbackExample(props) {

    const [dark, setDark] = useState(false)
    const [number, setNumber] = useState([])


    const theme = {
        backgroundColor: dark ? '#fff' : '#000',
        Color: dark ? '#000' : '#fff'
    }

    const getItem = useCallback((i)=>{
        console.log("Call Back Function Called"); 
        return [i+number, i+number+1, i+number+2]
    },[number])

    return (

        <>
            <div style={theme}>
                <button type='submit' onClick={() => { setDark(!dark) }}>Change Theme</button>
            </div>

            <div>
               <TextField type='text' placeholder='Please Enter Your Number' onChange={(e)=>{setNumber(parseInt(e.target.value))}} />
               <Listitem getItem={getItem}/>
            </div>
        </>
    );
}

export default UsecallbackExample;