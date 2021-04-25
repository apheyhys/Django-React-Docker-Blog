import React, { Fragment, useEffect, useState } from "react";
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from "react-redux";
import { APP_VK_AUTH, APP_OK_AUTH, APP_YANDEX_AUTH, APP_MAIL_AUTH } from "../../constants/constant";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { setSocialDialog } from '../../actions/actionCreator';
import facebook_icon from '../../assets/icon/facebook_icon.png';
import google_icon from '../../assets/icon/google_icon.png';
import mail_icon from '../../assets/icon/mail_icon.png';
import ok_icon from '../../assets/icon/ok_icon.png';
import vk_icon from '../../assets/icon/vk_icon.png';
import yandex_icon from '../../assets/icon/yandex_icon.png';
import useClearAuthentication from '../../hooks/useClearAuthentication';
import useConvertToken from '../../hooks/useConvertToken.js';
import useGetUser from '../../hooks/useGetUser.js';
import useRefreshToken from '../../hooks/useRefreshToken.js';

const useStyles = makeStyles((theme) => ({
    root: {
        ...theme
            .mixins
            .gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(1)
    },
    button: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        flex: 1
    },
    enterButton: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        width: "100%"
    },
    commentCount: {
        flex: 3
    },
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2)
    },
    image: {
        width: "100%"
    },
    grid: {
        marginBottom: theme.spacing(2),
    },
    socialButton: {
        cursor: "pointer",
        marginTop: 3,
        padding: 0,
        marginRight: theme.spacing(1),
        borderRadius: theme.spacing(1),
        width: 50,
        height: 50
    },
    facebookButton: {
        cursor: "pointer",
        border: 0,
        width: 50,
        height: 50,
        borderRadius: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: 4,
        paddingLeft: 0,
    },
    facebookButtonFocused: {
        outline: "none"
    },
    customTooltipMargin: {
        marginBottom: theme.spacing(1),
    },
    img: {
        width: 50,
    },
    imgFocused: {
        outline: "none"
    },
}));

export default function AuthDialog(props) {
    const classes = useStyles();

    const dispatch = useDispatch();

    const socialDialog = useSelector(state => state.socialDialog)

    const [access,
        setAccess] = useState(false);

    const [clear,
        setClearAuthentication] = useClearAuthentication(false);

    const [{ responseConvertToken, errorConvertToken }, setConvertToken] = useConvertToken(false)

    const [{ responseRefreshToken, errorRefreshToken }, setRefreshToken] = useRefreshToken(false)

    const [{ responseUser, errorUser }, setGetUser] = useGetUser(false)

    const comments_count = props.comments_count;

    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect(() => {
        let getAccessToken = sessionStorage.getItem("access_token");
        let getExpiresOn = sessionStorage.getItem("expires_on");
        let getExpiresIn = sessionStorage.getItem("expires_in");
        let getRefreshToken = sessionStorage.getItem("refresh_token");
        if (getAccessToken && getAccessToken !== "undefined") {
            if (getRefreshToken && Date.now() >= + getExpiresOn + (+ getExpiresIn * 1000)) {
                setRefreshToken(getRefreshToken);
            } else {
                setGetUser(getAccessToken);
                if (!errorUser) setAccess(true);
            }
        } else {
            setAccess(false);
        }
        sessionStorage.setItem("redirect_url", window.location.pathname);
    }, [clear, responseConvertToken, responseRefreshToken, responseUser, errorUser, setGetUser, setRefreshToken]);


    function callbackCatchFacebook(response) {
        setConvertToken({
            "accessToken": response.accessToken,
            "grant": "facebook"
        })
        dispatch(setSocialDialog(errorConvertToken ? true : false))
    };


    function callbackCatchGoogle(response) {
        setConvertToken({
            "accessToken": response.accessToken,
            "grant": "google-oauth2"
        })
        dispatch(setSocialDialog(errorConvertToken ? true : false))
    };

    const handleClose = (event, reason) => {
        if (reason) {
            setOpenSnackbar(false);
        }
    };

    return (
        <Fragment>
            {access
                ? <Grid
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Typography
                        component="span"
                        variant="body1"
                        color="textPrimary"
                        className={classes.commentCount}
                        align="center"
                    >
                        {comments_count < 1 ? `Нет комментариев` : `Комментарии: ${comments_count}`}
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => {
                            setClearAuthentication(sessionStorage.getItem("access_token"));
                            setConvertToken(false);
                        }}
                        className={classes.button}>
                        Выйти
                    </Button>
                </Grid>
                : <Grid container direction="column" justify="flex-start" alignItems="center">
                    <Grid
                        container
                        justify="center"
                        alignItems="center"
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"

                            onClick={() => dispatch(setSocialDialog(true))}
                            className={classes.enterButton}>
                            Войдите чтобы оставить комментарий
                    </Button>
                    </Grid>
                    <Box mt={1}>
                        <Typography
                            component="div"
                            variant="body1"
                            color="textPrimary"
                            className={classes.commentCount}
                            align="center"
                        >
                            {comments_count < 1 ? `Нет комментариев` : `Комментарии: ${comments_count}`}
                        </Typography>
                    </Box>
                </Grid>
            }

            <Dialog
                maxWidth="lg"
                open={socialDialog}
                aria-labelledby="max-width-dialog-title">
                <DialogTitle id="max-width-dialog-title">Войдите для комментирования</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.grid}
                        >
                            <FacebookLogin
                                appId="454352881988093"
                                fields="name,email,picture"
                                callback={callbackCatchFacebook}
                                cssClass={classes.facebookButton}
                                icon={
                                    <Tooltip title="Facebook" aria-label="Facebook" placement="top" classes={{ tooltip: classes.customTooltipMargin }}>
                                        <img src={facebook_icon} alt="Facebook" className={classes.img} />
                                    </Tooltip>}
                                textButton=""
                            />
                            <GoogleLogin
                                clientId="617235659841-se7l2b5rq7v170th58lm2093kdkjgtjr.apps.googleusercontent.com"
                                buttonText=""
                                onSuccess={callbackCatchGoogle}
                                cookiePolicy={'single_host_origin'}
                                render={renderProps => (
                                    <Tooltip title="Google" aria-label="Google" placement="top" classes={{ tooltip: classes.customTooltipMargin }}>
                                        <IconButton
                                            disableRipple={true}
                                            onClick={renderProps.onClick}
                                            className={classes.socialButton}>
                                            <img src={google_icon} alt="Google" className={classes.img}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )} />
                            <Tooltip title="VK" aria-label="VK" placement="top" classes={{ tooltip: classes.customTooltipMargin }}>
                                <IconButton
                                    disableRipple={true}
                                    href={APP_VK_AUTH}
                                    className={classes.socialButton}>
                                    <img src={vk_icon} alt="VK" className={classes.img} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Odnoklassniki" aria-label="Odnoklassniki" placement="top" classes={{ tooltip: classes.customTooltipMargin }}>
                                <IconButton
                                    disableRipple={true}
                                    href={APP_OK_AUTH}
                                    className={classes.socialButton}>
                                    <img src={ok_icon} alt="Odnoklassniki" className={classes.img} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Yandex" aria-label="Yandex" placement="top" classes={{ tooltip: classes.customTooltipMargin }}>
                                <IconButton
                                    disableRipple={true}
                                    href={APP_YANDEX_AUTH}
                                    className={classes.socialButton}>
                                    <img src={yandex_icon} alt="Yandex" className={classes.img} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mail.ru" aria-label="Mail.ru" placement="top" classes={{ tooltip: classes.customTooltipMargin }}>
                                <IconButton
                                    disableRipple={true}
                                    href={APP_MAIL_AUTH}
                                    className={classes.socialButton}>
                                    <img src={mail_icon} alt="Mail.ru" className={classes.img} />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dispatch(setSocialDialog(false))} color="primary">
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={openSnackbar} autoHideDuration={1400} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {errorRefreshToken}
                </Alert>
            </Snackbar>
        </Fragment>
    )
}