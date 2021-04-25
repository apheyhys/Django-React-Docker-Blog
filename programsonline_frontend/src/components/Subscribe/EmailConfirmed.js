import React from 'react';

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        margin: "10em"
    },
    button: {
        fontSize: 14,
        fontFamily: [
            'Lato',
            'Helvetica Neue',
            'Arial',
            'Helvetica',
        ],
        marginTop: 10
    }
}));

export default function EmailConfirmed() {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={1}>
            <Typography variant="h5" component="h3" align="center">
                Подписка на новости Programsonline.ru
                    </Typography>
            <Typography component="p" align="center">
                Спасибо что подписались!
                    </Typography>
        </Paper>
    )
}