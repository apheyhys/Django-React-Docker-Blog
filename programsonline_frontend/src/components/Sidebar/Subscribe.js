import axios from 'axios'
import React, { useState } from "react";

import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import { CREATE_SUBSCRIBER_PATH } from "../../constants/constant";

const useStyles = makeStyles((theme) => ({
    formHelperText: {
        color: "green"
    },
    root: {
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1)
        },
    },
}));

const theme = createMuiTheme({
    overrides: {
        MuiOutlinedInput: {
            root: {
                "&&& $input": {
                    paddingLeft: "16px"
                }
            }
        }
    }
});

export default function Subscribe() {
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [errorStatus, setErrorStatus] = useState(false);
    const [message, setMessage] = useState('');

    function handleSubmit() {
        if (email) {
            let requestOptions = {
                method: 'POST',
                data: {
                    "email": email
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            axios(CREATE_SUBSCRIBER_PATH, requestOptions).then(res => {
                setMessage("На вашу почту должно прийти сообщение для подтверждения подписки")
            }).catch(error => {
                if (JSON.stringify(error.response.data.email) === "[\"subscriber с таким email уже существует.\"]") {
                    setError("Email уже получает рассылку")
                    setErrorStatus(true)
                } else if (JSON.stringify(error.response.data.email) === "[\"Введите правильный адрес электронной почты.\"]") {
                    setError("Введите email вида example@emample.ru")
                    setErrorStatus(true)
                } else {
                    console.log(error.response);
                }
            })
        } else {
            setErrorStatus(true)
            setError("Поле не должно быть пустым")
        }
        const timer = setTimeout(() => {
            setErrorStatus(false)
            setError("")
            setMessage("")
        }, 10000);
        return () => clearTimeout(timer);
    }

    return (
        <form
            noValidate
            autoComplete="off"
            className={classes.root}
        >
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <MuiThemeProvider theme={theme}>
                    <TextField
                        error={errorStatus}
                        validators={['isEmail']}
                        type="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        onChange={(e) => setEmail(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                    />
                </MuiThemeProvider>
                {error
                    ? <FormHelperText
                        id="component-error-text"
                        error
                    >{error}</FormHelperText>
                    : null
                }
                {message
                    ? <FormHelperText
                        id="component-helper-text"
                        className={classes.formHelperText}
                    >{message}</FormHelperText>
                    : null
                }
                <Button
                    variant="contained"
                    color="primary"
                    component="button"
                    fullWidth={true}
                    onClick={handleSubmit}
                >
                    Подписаться на рассылку
                    </Button>
            </Grid>
        </form>
    )
}