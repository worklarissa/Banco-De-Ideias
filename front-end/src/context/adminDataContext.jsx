import { createContext, useState } from "react";
import { FetchApi } from "../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Prev } from "react-bootstrap/esm/PageItem";



export const AdminDataContext = createContext()

function AdminDataProvider({ children }) {

    const [dataItems, setData] = useState([])
    const [dataType,setDataType] = useState('')
    const [confirmation, setConfirmation] = useState(false)
    const [confirmationValue, setConfirmationValue] = useState(false)
    const [editMenu, setEditMenu] = useState(false)
    // const [isLoading,setStopLoading] = useState(true)
    const [operation, setOperation] = useState('')


    const toggleConfirmation = () => {
        setConfirmation(!confirmation)

    }

    const toggleEditMenu = () => {
        setEditMenu(!editMenu)

    }

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

            case 'update':
                setConfirmationValue(value)
                setOperation(key)
                console.log(confirmationValue)

            break;

            default:
                break;
        }
       
    }

    const switchDataType = (key) => {
     
        switch (key) {
            case 'projects':
           
            setDataType('project')
                break;

            case 'users':
               setDataType('user')
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
        <AdminDataContext.Provider value={{ setItems, dataItems,dataType,switchDataType, operation, toggleConfirmation, confirmation, sendConfirmationValue, confirmationValue, toggleEditMenu,editMenu}}>{children}</AdminDataContext.Provider>
    )
}


export default AdminDataProvider