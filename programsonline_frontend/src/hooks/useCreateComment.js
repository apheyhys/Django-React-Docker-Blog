import axios from 'axios'
import { useEffect, useState } from 'react'

import { CREATE_COMMENTS } from "../constants/constant";

export default (body) => {
    const [value,
        setValue] = useState(body)

    const [responseCreateComment, setResponseCreateComment] = useState(false)
    const [errorCreateComment, setErrorCreateToken] = useState(false)
    const [errorToken, setErrorToken] = useState(false)

    useEffect(() => {
        let skipGetResponseAfterDestroy = false

        const requestOptions = {
            method: 'POST',
            data: {
                "user": value.user,
                "body": value.body,
                "post": value.post,
                'parent': value.parent
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + value.getAccessToken
            }
        }

        if (value.body) {
            if (value.getAccessToken && Date.now() >= +value.getExpiresOn + (+value.getExpiresIn * 1000)) {
                setErrorToken(true)
                return
            }
            axios(CREATE_COMMENTS + value.post_slug, requestOptions).then(res => {
                if (!skipGetResponseAfterDestroy) {
                    setResponseCreateComment("Комментарий создан")
                }
            }).catch(error => {
                if (!skipGetResponseAfterDestroy) {
                    setErrorCreateToken(error.response.data)
                }
            })
            return () => {
                skipGetResponseAfterDestroy = true
            }
        } else {
            setResponseCreateComment(false)
        }

    }, [value])

    return [{ responseCreateComment, errorCreateComment, errorToken }, setValue]
}
