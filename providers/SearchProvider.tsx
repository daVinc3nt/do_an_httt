'use client';
import { createContext, ReactNode, useState, useContext, useEffect } from 'react';


export interface SearchContextInterface {
    searchTitle: string,
    setSearchTitle: (state: string) => any
}

export const SearchContext = createContext({} as SearchContextInterface);


type Props = {
    children: ReactNode
};

export default function SearchProvider({ children }: Props) {
    const [searchTitle, setSearchTitle] = useState<string>("");

    return (
        <SearchContext.Provider
            value={{
                searchTitle, setSearchTitle
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearchContext() {
    return useContext(SearchContext)
}  