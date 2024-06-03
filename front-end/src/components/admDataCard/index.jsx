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

    const {dataItems,dataType,toggleConfirmation,sendConfirmationValue,toggleEditMenu } = useContext(AdminDataContext)

    const ApiUrl = import.meta.env.VITE_API_URL
    const signOut = useSignOut()
    const navigate = useNavigate()
    const header = useAuthHeader()
    const cleanToken = header.replace("x-acess-token", "")

    const confirmation = (value,key) => {
        toggleConfirmation()
        sendConfirmationValue(value,key)
        
    }

    const editMenu = (values,key) =>{
        sendConfirmationValue(values,key)
        toggleEditMenu()
}

    
    return (
        <>
            {dataItems && dataType === 'project' ? (
                dataItems.map((item, idx) => (
                    <div key={idx}>

                        <table >
                            <tbody>
                                <tr>
                                    <th>id</th>
                                    <th>titulo</th>
                                    <th>texto  <div className="edit-delete-admin">
                                        {!item.isValid? <GrValidate className="editIcons-admin" onClick={()=>confirmation(item.id,'aproval')} /> : null}
                                        <FaEdit className="editIcons-admin" onClick={()=> editMenu(item,'update')} />
                                        <FaTrash className="editIcons-admin" onClick={() =>confirmation(item.id,'delete') } />
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

            {dataItems && dataType === 'user' ? (
                dataItems.map((item, idx) => (
                    <div key={idx}>

                        <table >
                            <tbody>
                                <tr>
                                    <th>id</th>
                                    <th>nome</th>
                                    <th>email  <div className="edit-delete-admin">
                                        {/* {!item.isValid? <GrValidate className="editIcons-admin" onClick={()=>confirmation(item.id,'aproval')} /> : null} */}
                                        {/* <FaEdit className="editIcons-admin" onClick={()=> editMenu(item,'update')} /> */}
                                        <FaTrash className="editIcons-admin" onClick={() =>confirmation(item.id,'delete') } />
                                    </div>
                                    </th>
                                    <th>senha</th>
                                    <th>número de ideias</th>
                                    <th>criado</th>
                                    <th>atualizado</th>
                                </tr>
                                <tr>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td className="text-table">{item.email}</td>
                                    <td>{item.password}</td>
                                    <td>{item.ideasNumber}</td>
                                    <td>{item.createdAt}</td>
                                    <td>{item.updatedAt}</td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                ))
            ): null}

        </>
    )
}

export default DataCard