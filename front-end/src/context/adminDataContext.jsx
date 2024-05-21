import { createContext, useState } from "react";
import { FetchApi } from "../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";



export const AdminDataContext = createContext()

function AdminDataProvider({ children }) {

    const [dataItems, setData] = useState([])
    const [confirmation, setConfirmation] = useState(false)
    const [confirmationValue, setConfirmationValue] = useState(false)
    const [aproval,setAproval] = useState(false)
    const [postId, setPostId] = useState()


    const toggleConfirmation = () =>{
        setConfirmation(!confirmation)
    
    }

    const toggleAprovalMenu = () =>{
        setAproval(!aproval)
    }

    const sendConfirmationValue = (value) =>{
        setConfirmationValue(value)
    }

    const setItems = (values) =>{
        setData(values)
        console.log(dataItems)
    }


    return (
        <AdminDataContext.Provider value={{ setItems, dataItems,aproval,toggleAprovalMenu,toggleConfirmation,confirmation,sendConfirmationValue,confirmationValue }}>{children}</AdminDataContext.Provider>
    )
}


export default AdminDataProvider