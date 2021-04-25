import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";

import { setUserAccess, setUserName, setUserPicture, setUserSurname, setUserUid } from '../actions/actionCreator';
import { CLEAR_TOKEN, CLIENT_ID } from "../constants/constant";

export default (key) => {
    const [value,
        setValue] = useState(key)

    const [errorClearToken, setErrorClearToken] = useState(false)

    const dispatch = useDispatch();

    useEffect(() => {

        let skipGetResponseAfterDestroy = false

        let formData = new FormData();

        formData.append('client_id', CLIENT_ID);

        const requestOptions = {
            method: 'POST',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + value
            }
        }

        if (value) {
            axios(CLEAR_TOKEN, requestOptions).then(res => {
                if (!skipGetResponseAfterDestroy) {
                    dispatch(setUserAccess(""))
                    dispatch(setUserName(""))
                    dispatch(setUserSurname(""))
                    dispatch(setUserPicture(""))
                    dispatch(setUserUid(""))
                    sessionStorage.removeItem("access_token");
                    sessionStorage.removeItem("refresh_token");
                    sessionStorage.removeItem("expires_in");
                    sessionStorage.removeItem("expires_on");
                    setValue(false)
                }
            }).catch(error => {
                if (!skipGetResponseAfterDestroy) {
                    setErrorClearToken(error.response.data)
                }
            })
            return () => {
                skipGetResponseAfterDestroy = true
            }
        } else {
            return
        }
    }, [value, dispatch])

    return [{ value, errorClearToken }, setValue]
}
