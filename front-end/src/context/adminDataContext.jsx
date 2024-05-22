import { createContext, useState } from "react";
import { FetchApi } from "../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Prev } from "react-bootstrap/esm/PageItem";



export const AdminDataContext = createContext()

function AdminDataProvider({ children }) {

    const [dataItems, setData] = useState([])
    const [confirmation, setConfirmation] = useState(false)
    const [confirmationValue, setConfirmationValue] = useState(false)
    const [editMenu, toggleEditMenu] = useState(false)
    // const [isLoading,setStopLoading] = useState(true)
    const [operation, setOperation] = useState('')
    const [postId, setPostId] = useState()


    const toggleConfirmation = () => {
        setConfirmation(!confirmation)

    }

    // const toggleLoading = () =>{
    //     setStopLoading(!isLoading)
    //     console.log(isLoading)
    // }

    const sendConfirmationValue = (value, key) => {
     
        switch (key) {
            case 'aproval':
                setConfirmationValue(value)
                setOperation((key))
                break;

            case 'delete':
                setConfirmationValue(value)
                setOperation(key)
                break;

            default:
                break;
        }
       
    }

    const setItems = (values) => {
        setData(values)
        console.log(dataItems)
    }


    return (
        <AdminDataContext.Provider value={{ setItems, dataItems, operation, toggleConfirmation, confirmation, sendConfirmationValue, confirmationValue}}>{children}</AdminDataContext.Provider>
    )
}


export default AdminDataProvider