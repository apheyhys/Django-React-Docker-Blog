import {useEffect, useState} from 'react'

export default (token) => {
    const [value,
        setValue] = useState(token)
    const [responseCheckToken, setCheckToken] = useState(false)

    

    useEffect(() => {
        if (value.getAccessToken && Date.now() >= +value.getExpiresOn + (+value.getExpiresIn * 1000)) {
            setCheckToken(false)   
        }
        else {
            setCheckToken(true)
        }
    }, [value])

    return [{responseCheckToken}, setValue]
}