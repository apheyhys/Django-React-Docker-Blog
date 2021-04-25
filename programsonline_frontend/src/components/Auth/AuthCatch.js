import axios from 'axios'
import qs from 'qs';
import React, { Fragment, useCallback, useEffect } from "react";
import { Redirect } from 'react-router-dom';

import { Backdrop } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import { MAILRU_CODE_CONVERT, OK_CODE_CONVERT, VK_CODE_CONVERT, YANDEX_CODE_CONVERT } from "../../constants/constant";
import useConvertToken from '../../hooks/useConvertToken.js';

export default function AuthCatch() {

    const [
        { responseConvertToken }, setConvertToken] = useConvertToken(false)

    const convertCodeToToken = useCallback((grant, code) => {
        let network_url = '';
        switch (grant) {
            case 'yandex-oauth2':
                network_url = YANDEX_CODE_CONVERT
                break;
            case 'vk-oauth2':
                network_url = VK_CODE_CONVERT
                break;
            case 'odnoklassniki-oauth2':
                network_url = OK_CODE_CONVERT
                break;
            case 'mailru-oauth2':
                network_url = MAILRU_CODE_CONVERT
                break;
            default:
                return
        }

        const requestOptions = {
            method: 'POST',
            data: {
                "code": code
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }

        axios(network_url, requestOptions).then(response => {
            setConvertToken({ "accessToken": response.data, "grant": grant })
        }).catch(error => {
            console.log(error);
        })
    }, [setConvertToken])

    useEffect(() => {
        const parsed = qs.parse(window.location.search);
        if (parsed['?state'] === "yandex") {
            convertCodeToToken("yandex-oauth2", parsed['code'])
        } else if (parsed['state'] === "ok") {
            convertCodeToToken("odnoklassniki-oauth2", parsed['?code'])
        } else if (parsed['?state'] === "mail") {
            convertCodeToToken("mailru-oauth2", parsed['code'])
        } else if (parsed['state'] === "vk") {
            convertCodeToToken("vk-oauth2", parsed['?code'])
        } else {
            return
        }
    }, [convertCodeToToken]);


    return (
        <Fragment>
            {responseConvertToken
                ? <Redirect to={sessionStorage.getItem("redirect_url")} />
                :
                <Backdrop open={!responseConvertToken}>
                    <CircularProgress />
                </Backdrop>}
        </Fragment>
    )
}
