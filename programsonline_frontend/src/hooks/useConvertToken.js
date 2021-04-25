import axios from 'axios'
import { useEffect, useState } from 'react'

import { CLIENT_ID, CONVERT_TOKEN } from "../constants/constant";

export default (get_param) => {
    const [value,
        setValue] = useState(get_param)

    const [responseConvertToken, setResponseConvertToken] = useState(null)
    const [errorConvertToken, setErrorConvertToken] = useState(null)


    useEffect(() => {
        let skipGetResponseAfterDestroy = false

        const requestOptions = {
            method: 'POST',
            data: {
                "grant_type": 'convert_token',
                "client_id": CLIENT_ID,
                "backend": value['grant'],
                "token": value['accessToken']
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (value) {
            axios(CONVERT_TOKEN, requestOptions).then(res => {
                if (!skipGetResponseAfterDestroy) {
                    setResponseConvertToken(res.data)
                    sessionStorage.setItem("access_token", res.data.access_token);
                    sessionStorage.setItem("refresh_token", res.data.refresh_token);
                    sessionStorage.setItem("expires_in", res.data.expires_in);
                    sessionStorage.setItem("expires_on", Date.now().toString());                    
                }
            }).catch(error => {
                if (!skipGetResponseAfterDestroy) {
                    setErrorConvertToken(error.response.data)
                }
            })
            return () => {
                skipGetResponseAfterDestroy = true
            }
        } else {
            return
        }

    }, [value])

    return [{ responseConvertToken, errorConvertToken }, setValue]
}
