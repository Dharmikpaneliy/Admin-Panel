import React, { useContext } from 'react';
import ThemeContext from '../../Context/CreateContext';

function Context(props) {

    const theme = useContext(ThemeContext)

    console.log(theme);

    return (
        <div className={`${theme.theme}`}>
            <button onClick={()=>theme.toogle_theme(theme.theme)}>
                Change Theme
            </button>
        </div>
    );
}

export default Context;