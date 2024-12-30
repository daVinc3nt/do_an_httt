'use client';
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';


export interface UserContextInterface {
    loggedIn: boolean,
    setLoggedIn: (state: boolean) => any
}

export const UserContext = createContext({} as UserContextInterface);


type Props = {
    children: ReactNode
};

export default function UserProvider({ children }: Props) {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    return (
        <UserContext.Provider
            value={{
                loggedIn, setLoggedIn
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    return useContext(UserContext)
}  