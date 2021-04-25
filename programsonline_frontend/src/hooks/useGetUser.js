import axios from 'axios'
import {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";

import {setUserAccess, setUserName, setUserPicture, setUserSurname, setUserUid} from '../actions/actionCreator';
import {GET_USER_INFO} from "../constants/constant";

export default(token) => {
    const [value,
        setValue] = useState(token)
    
    const [responseUser, setResponseUser] = useState(null)
    const [errorUser, setErrorUser] = useState(null)

    const dispatch = useDispatch();

    useEffect(() => {
        const requestOptions = {
            method: 'GET',  
            headers: {
                'Authorization': 'Bearer ' + value
            }
        }    

        let skipGetResponseAfterDestroy = false               
        
        if (value) {
            axios(GET_USER_INFO, requestOptions).then(res => {
                if (!skipGetResponseAfterDestroy) {                    
                    setResponseUser(res.data)
                    dispatch(setUserAccess(true))
                    dispatch(setUserName(res.data.name))
                    dispatch(setUserSurname(res.data.surname))
                    dispatch(setUserPicture(res.data.pictureLink))
                    dispatch(setUserUid(res.data.id))                   
                }
            }).catch(error => {
                if (!skipGetResponseAfterDestroy) {
                    setErrorUser(error.response.data)
                }
            })
            return () => {
                skipGetResponseAfterDestroy = true}
        } else {
            return
        }

    }, [value, dispatch]) 

    return [{responseUser, errorUser}, setValue]
}
