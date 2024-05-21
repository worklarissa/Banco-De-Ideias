import { useContext, useEffect, useState } from "react"
import { AdminDataContext } from "../../context/adminDataContext"
import { FaEdit, FaTrash } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import "./dataCard.css"
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { FetchApi } from "../../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";


function DataCard() {

    const { setItems, dataItems,toggleConfirmation,sendConfirmationValue,aproval,toggleAprovalMenu } = useContext(AdminDataContext)

    const ApiUrl = import.meta.env.VITE_API_URL
    const signOut = useSignOut()
    const navigate = useNavigate()
    const header = useAuthHeader()
    const cleanToken = header.replace("x-acess-token", "")

    const confirmation = (value) => {
        toggleConfirmation()
        sendConfirmationValue(value)
    }

    const confirmationAproval = (value) => {
        toggleConfirmation()
        toggleAprovalMenu()
        sendConfirmationValue(value)
    }


    
    return (
        <>
            {dataItems ? (
                dataItems.map((item, idx) => (
                    <div key={idx}>

                        <table >
                            <tbody>
                                <tr>
                                    <th>id</th>
                                    <th>titulo</th>
                                    <th>texto  <div className="edit-delete-admin">
                                        <GrValidate className="editIcons-admin" onClick={()=>confirmationAproval(item.id)} />
                                        <FaEdit className="editIcons-admin" />
                                        <FaTrash className="editIcons-admin" onClick={() =>confirmation(item.id) } />
                                    </div>
                                    </th>
                                    <th>dificuldade</th>
                                    <th>isValid</th>
                                    <th>criado</th>
                                    <th>atualizado</th>
                                    <th>id_usuario</th>
                                    <th>hashtags</th>
                                </tr>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td className="text-table">{item.text}</td>
                                    <td>{item.difficultLevel}</td>
                                    <td>{item.isValid ? 'true' : 'false'}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                    <td>{item.id_user}</td>
                                    <td>{item.hashtags.map((hashtag) => (hashtag.hashtag))}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                ))
            ) : null}

        </>
    )
}

export default DataCard