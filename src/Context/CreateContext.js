import { createContext, useReducer } from 'react';
import { themeReducer } from './Reducer/Context.Reducer';
import * as Actiontype from './Actiontype';

export const  ThemeContext = createContext();

const initValue = {
    theme: 'light'
}

export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(themeReducer, initValue)

    const toogle_theme = (theme) => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch({type: Actiontype.TOOGLE_THEME, payload: newTheme}) 
    }

    return (
        <ThemeContext.Provider
           value={{
               ...state,
               toogle_theme
           }}
        >
            { children }
        </ThemeContext.Provider>
    )
}

export default ThemeContext;

