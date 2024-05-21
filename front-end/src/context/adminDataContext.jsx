import { createContext, useState } from "react";
import { FetchApi } from "../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";



export const AdminDataContext = createContext()

function AdminDataProvider({ children }) {

    const [dataItems, setData] = useState([])



    const setItems = (values) =>{
        setData(values)
        console.log(dataItems)
    }


    return (
        <AdminDataContext.Provider value={{ setItems, dataItems }}>{children}</AdminDataContext.Provider>
    )
}


export default AdminDataProvider