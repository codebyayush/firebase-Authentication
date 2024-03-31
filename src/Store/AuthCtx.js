import React, { useState } from 'react'

const AuthCtx = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}
})

export const AuthContextProvider = (props) => {

    const initialToken = localStorage.getItem('TOKEN')
    const [token, setToken] = useState(initialToken);
    
    const userIsLoggedIn = !!token;

    console.log(userIsLoggedIn)

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem("TOKEN", token);
    }

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem("TOKEN");
    }

    const ctxValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    }

    return <AuthCtx.Provider value={ctxValue}>
        {props.children}
    </AuthCtx.Provider>
}

export default AuthCtx;