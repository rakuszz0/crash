import React, { createContext, useState } from "react"

export const TicketContext = createContext();

export const TicketContextProvider = (props) => {
    const [modalShow, setModalShow] = React.useState(false)
    const [showLogin, setShowLogin] = useState(false);

    return (
        <TicketContext.Provider value={{ modalShow, setModalShow, showLogin, setShowLogin }}>
            {props.children}
        </TicketContext.Provider>
    )
}