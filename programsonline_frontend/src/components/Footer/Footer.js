import React from "react";

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: "#e0e0e0",
        padding: theme.spacing(3, 0),
        marginTop: theme.spacing(2),
        marginBottom: 0,
        width: "100%",
        textAlign: "center",
        boxShadow: "0px -2px 4px -1px rgba(0,0,0,0.2), 0px -4px 5px 0px rgba(0,0,0,0.14), 0px -1px 10px 0px rgba(0,0,0,0.12)"
    },
    privacy: {
        marginLeft: theme.spacing(1),
        color: "#000000"
    }
}));

export default function Footer() {
    const classes = useStyles();
    const preventDefault = (event) => event.preventDefault();

    return (
        <footer className={classes.footer}>
            <Container>
                <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                >
                    ©programsonline.ru 2021
                </Typography>
                 <Link
                     className={classes.privacy}
                     to={`/privacy`}
                 >
                            Политика конфиденциальности
                    </Link>
            </Container>
        </footer>
    )
}
