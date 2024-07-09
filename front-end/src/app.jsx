
import Header from "./components/header";
import AdminDataProvider from "./context/adminDataContext";
import Router from "./routes/router";
import { ToastContainer } from 'react-toastify';
import { StandbyContext } from "./context/isStandbyContext";
import { useContext, useEffect, useState } from "react";

function App() {
    const { page } = useContext(StandbyContext)
    const [render, setRender] = useState(true)

    useEffect(()=>{
        console.log('caiu aqui amudança', page)
        if(page === 'admDash'){
            setRender(false)
        }else{
            setRender(true)
        }
       
    },[page])

    return (
        <>
            <ToastContainer closeOnClick="true" />
            {render ? <Header /> : null}
            <AdminDataProvider>
                <Router />
            </AdminDataProvider>
        </>
    );
}

export default App;