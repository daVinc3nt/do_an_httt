"use client"
import { SearchAddition, SearchCriteria, SearchPayload } from '@/do_an-library/interfaces';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
interface SessionContextType {
    status: 'loading' | 'authenticated' | 'unauthenticated';
    session: null | any; // Replace 'any' with appropriate session type
    setSession: Dispatch<SetStateAction<null | any>>; // Adjust type accordingly
}
export const getSid = () => {
    const sid = Cookies.get("sid");
    const gid = Cookies.get("gid");
    if (sid) {
        Cookies.remove("gid");
        return sid;
    }
    return gid;
};
const SessionContext = createContext<SessionContextType>({
    status: 'loading', // Có thể là 'loading', 'authenticated', 'unauthenticated'
    session: null,
    setSession: () => {},
});
export function SessionProvider({ children }) {
    const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>("loading");
    const [session, setSession] = useState(null);
    const pathName = usePathname()
    const router =useRouter();
    const sid = getSid()
   
    const SearchPayload: SearchPayload ={			
        criteria: [{
            field: "skill",
            operator: "=",
            value: null,
        }] as SearchCriteria[],
        addition: {
            sort: [],
            page: 1,
            size: 500,
            group: []
        } as SearchAddition,
    }
    useEffect(() => {
        // const fetchData = async () => {
        //     setSession(null)
        //     console.log(infoRes)
        //     if(!infoRes.success)
        //         {
        //             if(pathName.toString() !== "/error?error=Configuration"&& pathName.toString() !== "/error?error=AccessDenied" && pathName.toString() !== "/" && pathName.toString() !== "/en" && pathName.toString() !== "/vi") router.push("/login")
        //             setStatus('unauthenticated');
        //             return
        //         }
        //     let session= Object.assign({}, infoRes.data, {
        //         sid: sid,
        //     })
        //     // console.log("hello")
        //     setSession(session);
        //     setStatus('authenticated');
        // };
        // fetchData();
    }, [pathName]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions: RequestInit = {
                method: "POST",
                redirect: "follow",
                credentials: "include",
              };
              
              fetch("https://api.engonow.com/v1/auth/token/refresh", requestOptions)
                .then((response: Response) => {
                    return response.text();
                })
                .then((result: string) => console.log(result))
                .catch((error: Error) => console.error(error));
            };
            const intervalId = setInterval(() => {
                fetchData();
            }, 15 * 60 * 1000 ); // 15 phút = 15 * 60 * 1000 milliseconds
            return () => clearInterval(intervalId);
    }, []);

    return (
        <SessionContext.Provider value={{ status, session, setSession }}>
            {children}
        </SessionContext.Provider>
    );
}
export function useSession() {
    const { status, session, setSession } = useContext(SessionContext);
    return { status, session, setSession };
}