import { createContext,useState } from "react";



export const StandbyContext = createContext()


function StandbyProvider({children}){
    const [standby, setStandby] = useState(false)

    const handleStandbyToggle = () =>{
        setStandby(!standby)
    }

    return(
        <StandbyContext.Provider value={{standby,handleStandbyToggle}}>{children}</StandbyContext.Provider>
    )
}


export default StandbyProvider