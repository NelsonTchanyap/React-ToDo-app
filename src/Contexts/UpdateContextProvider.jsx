import React, { createContext , useState } from 'react';

export const updateContext = createContext();

export default function UpdateContextProvider( { value , children } ) {

    const TodosList = localStorage.getItem("todos")
    
    const [ data , setData ] = useState(TodosList)

    return (

        <updateContext.Provider value={ {data , setData} } >
           { children }
        </updateContext.Provider>

    );

}
