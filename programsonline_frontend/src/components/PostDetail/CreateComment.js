import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Button, TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import Alert from '@material-ui/lab/Alert';

import { setCollapseComments } from '../../actions/actionCreator';
import useCreateComment from '../../hooks/useCreateComment';

const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    form: {
        paddingBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    mainForm: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(1),
        width: "100%",

    },
    commonMain: {
        margin: 0,
        padding: 0
    },
    divider: {
        margin: theme.spacing(1),
        width: "100%"
    },
    grid: {
        marginLeft: theme.spacing(2),
    },
    mainGrid: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(5),

    },
    avatar: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    textField: {
        marginRight: theme.spacing(1),
    },
    mainTextField: {
        marginLeft: 0,
        marginRight: theme.spacing(3),
        paddingLeft: 0,
    },
    button: {
        marginTop: theme.spacing(1),
    },
    mainButton: {
        marginTop: theme.spacing(1),
    },
    icon: {
        margin: 0,
        fontSize: 24,
        padding: '0px 10px 0px 0px',
    },
    bootstrapRoot: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        marginBottom: theme.spacing(1),
        lineHeight: 1.5,
        borderRadius: '5px',
        fontWeight: 'bold',
        fontFamily: [
            'Lato',
            'Helvetica Neue',
            'Arial',
            'Helvetica',
        ].join(','),
    }
}));



export default function CreateComment(props) {
    const classes = useStyles();

    const comment_id = props.comment_id;
    const post_id = props.post;
    const post_slug = props.post_slug;

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const dispatch = useDispatch();

    const userUid = useSelector(state => state.userUid)
    const userName = useSelector(state => state.userName)
    const userPicture = useSelector(state => state.userPicture)
    const userSurname = useSelector(state => state.userSurname)
    const mainForm = props.main

    const [value, setValue] = useState('')

    const [{ responseCreateComment, errorToken }, setCreateComment] = useCreateComment(false)

    useEffect(() => {
        if (responseCreateComment) {
            setOpenSnackbar(true)
            setValue('')
            const timer = setTimeout(() => {
                dispatch(setCollapseComments(true))
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [responseCreateComment, dispatch])

    const handleClose = (event, reason) => {
        if (reason) {
            setOpenSnackbar(false);  
        }
    };

    if (errorToken) {
        return <Redirect to={sessionStorage.getItem("redirect_url")} />
    }

    return (
        <Fragment>
            {mainForm ? <Divider className={classes.divider} /> : null}
            <Grid
                container justify="flex-start"
                alignItems="flex-start"
                className={mainForm ? classes.commonMain : classes.mainGrid}
                direction="column"
            >
                <Grid container justify="flex-start"
                    alignItems="center"
                    className={mainForm ? classes.commonMain : classes.grid}
                >
                    <Avatar alt="Remy Sharp"
                        src={userPicture}
                        className={classes.avatar}
                    />
                    <Typography
                        component="span"
                        variant="body1"
                        className={classNames(classes.inline, classes.author)}
                        color="textPrimary"
                    >
                        <span>{userName}{" "}{userSurname}</span>
                    </Typography>
                </Grid>

                <Grid container justify="flex-start"
                    alignItems="center"
                    className={mainForm ? classes.commonMain : classes.grid}
                >
                    <form
                        id="general-form"
                        className={mainForm ? classes.mainForm : classes.form}
                    >
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Напишите ваш комментарий"
                            multiline
                            fullWidth
                            rows="3"
                            rowsMax="4"
                            value={value}
                            onChange={e => setValue(e.target.value)}
                            className={mainForm ? classes.mainTextField : classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            className={mainForm ? classNames(classes.mainButton, classes.bootstrapRoot) : classNames(classes.button, classes.bootstrapRoot)}
                            onClick={() => setCreateComment({
                                "user": userUid,
                                "body": value,
                                "post": post_id,
                                "parent": comment_id,
                                "post_slug": post_slug,
                                "getAccessToken": sessionStorage.getItem("access_token"),
                                "getExpiresOn": sessionStorage.getItem("expires_on"),
                                "getExpiresIn": sessionStorage.getItem("expires_in")
                            })}
                        >
                            <CreateIcon
                                className={classes.icon}
                            />
                    Добавить
                </Button>
                    </form>
                </Grid>
                <Snackbar open={openSnackbar} autoHideDuration={1400} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        Комментарий добавлен!
                </Alert>
                </Snackbar>
            </Grid>
        </Fragment>
    )

}