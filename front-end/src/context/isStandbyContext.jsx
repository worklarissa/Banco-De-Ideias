import { createContext,useState } from "react";



export const StandbyContext = createContext()


function StandbyProvider({children}){
    const [page, setPage] = useState('')

    const selectPage = (pageName) =>[
        setPage(pageName)
    ]

    return(
        <StandbyContext.Provider value={{page,selectPage}}>{children}</StandbyContext.Provider>
    )
}


export default StandbyProvider