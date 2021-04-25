import axios from 'axios'
import React, { Fragment, useState } from 'react'
import {
  GoogleReCaptchaProvider
} from 'react-google-recaptcha-v3';
import { Helmet } from "react-helmet";

import { FormHelperText } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Snackbar from '@material-ui/core/Snackbar';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { CREATE_CONTACT } from "../../constants/constant";

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    margin: theme.spacing(1),
  },
  divider: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  formHelperText: {
    color: "green"
  },
  box: {
    minHeight: "83vh"
  }
}));


export default function Contact() {
  const classes = useStyles();
  const [name, setName] = useState("")
  const [body, setBody] = useState("")
  const [error, setError] = useState("")

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClose = (event, reason) => {
    if (reason) {
      setOpenSnackbar(false);
    }
  };

  function handleSubmit() {
    const requestOptions = {
      method: 'POST',
      data: {
        "name": name,
        "body": body
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (name && body && name.length < 100 && body.length < 500) {
      axios(CREATE_CONTACT, requestOptions).then(res => {
        if (res.status === 201) {
          setOpenSnackbar(true)
        } else {
          setError("Ошибка!")
        }
        const timer = setTimeout(() => {
          setName("")
          setBody("")
          setError("")
        }, 1000);
        return () => clearTimeout(timer);
      }).catch(error => {
        console.log(error.response);
      })
    } else {
      if (!name && !body) {
        setError("Поле не должно быть пустым")
      } else if (name.length >= 100) {
        setError("Максимальная длина имени - 100 символов")
      } else if (body.length >= 500) {
        setError("Максимальная длина сообщения - 500 символов")
      }
      const timer = setTimeout(() => {
        setError("")
      }, 5000);
      return () => clearTimeout(timer);
    }
  }

  return (
    <Fragment>
      <Helmet>
        <title>ProgramsOnline - Контакты</title>
        <meta name="description" content="Напишите нам" />
      </Helmet>
<Box className={classes.box}>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3" align="center">
          Написать сообщение
                </Typography>
        <Divider className={classes.divider} />
        <Typography variant="body2" component="p">
          Если вы знаете интересный онлайн сервис, то сообщите нам о нем:
                </Typography>
        <GoogleReCaptchaProvider
          reCaptchaKey="6LcgIfgUAAAAAKHC4a_78QL5yolC0kIXsSYjqQTP"
          // language=""
          useRecaptchaNet
        >
          <form noValidate autoComplete="off">
            <Grid
              container
              direction="column"
            >
              <TextField
                error={name.length > 100 ? true : false}
                id="outlined-name"
                label="Ваше имя"
                value={name}
                className={classes.textField}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                helperText={(error ? false : "Максимальная длина имени - 100 символов")}
                variant="outlined"
              />
              <TextField
                error={body.length > 500 ? true : false}
                id="outlined-multiline-flexible"
                label="Ваше сообщение"
                value={body}
                multiline
                rows="5"
                rowsMax="4"
                onChange={(e) => setBody(e.target.value)}
                className={classes.textField}
                margin="normal"
                helperText={(error ? false : "Максимальная длина сообщения - 500 символов")}
                variant="outlined"
              />
              {error
                ? <FormHelperText
                  id="component-error-text"
                  error
                >{error}</FormHelperText>
                : null
              }
              <Button
                variant="outlined"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Отправить
                        </Button>
            </Grid>

          </form>

        </GoogleReCaptchaProvider>
        <Snackbar open={openSnackbar} autoHideDuration={1400} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Сообщение отправлено!
                </Alert>
        </Snackbar>
      </Paper>
</Box>
    </Fragment>
  );
}

