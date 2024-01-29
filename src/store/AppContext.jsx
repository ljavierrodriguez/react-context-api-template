import React from 'react'
import { createContext, useEffect, useState } from "react";
import getStore from "./flux";


export const Context = createContext(null);

/** 
 * 
 * injectContext es una funcion que recibe como argumento un componente el cual sera 
 * envuelto dentro del contexto para tener acceso al estado global retonando un nuevo componente
 * 
*/
const injectContext = PassedComponent => {
    const StoreWrapper = (props) => {

        const [state, setState] = useState(getStore({
            getStore: () => state.store,
            getActions: () => state.actions,
            setStore: (updateStore) => setState({
                store: Object.assign(state.store, updateStore),
                actions: {...state.actions}
            })
        }))

        useEffect(() => {

            // aqui pueden ejecutar aquellas funciones que deseen ejecutar 
            // al momento de cargar la pagina web por primera vez

            // state.actions.getUsers()

        }, [])

        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        )
    }

    return StoreWrapper
}

export default injectContext