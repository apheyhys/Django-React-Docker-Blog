import axios from 'axios'
import { useEffect, useState } from 'react'

import { CLIENT_ID, REFRESH_TOKEN } from "../constants/constant";

export default (token) => {
    const [value,
        setValue] = useState(token)

    const [responseRefreshToken, setResponseRefreshToken] = useState(null)
    const [errorRefreshToken, setErrorRefreshToken] = useState(null)

    useEffect(() => {
        let skipGetResponseAfterDestroy = false

        const requestOptions = {
            method: 'POST',
            data: {
                "grant_type": 'refresh_token',
                "client_id": CLIENT_ID,
                "refresh_token": value
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (value) {
            axios(REFRESH_TOKEN, requestOptions).then(res => {
                if (!skipGetResponseAfterDestroy) {
                    setResponseRefreshToken(res.data)
                    sessionStorage.setItem("access_token", res.data.access_token);
                    sessionStorage.setItem("refresh_token", res.data.refresh_token);
                    sessionStorage.setItem("expires_in", res.data.expires_in);
                    sessionStorage.setItem("expires_on", Date.now().toString());
                    setErrorRefreshToken("error.response.data") //стереть
                }
            }).catch(error => {
                if (!skipGetResponseAfterDestroy) {
                    setErrorRefreshToken(error.response.data)
                }
            })
            return () => {
                skipGetResponseAfterDestroy = true
            }
            
        } else {
            return
        }

    }, [value])

    return [{ responseRefreshToken, errorRefreshToken }, setValue]
}
