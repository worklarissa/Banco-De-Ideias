import Header from "./components/header";
import AdminDataProvider from "./context/adminDataContext";
import Router from "./routes/router";
import { ToastContainer } from 'react-toastify'

function App() {
    return (
        <>
            <ToastContainer closeOnClick="true" />
            <Header />
            <AdminDataProvider>

       
                <Router />
            </AdminDataProvider>

        </>
    )
}

export default App