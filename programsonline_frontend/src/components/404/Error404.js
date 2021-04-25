import React, { Fragment } from 'react';
import { Helmet } from "react-helmet";

import { Box } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import SentimentDissatisfiedSharpIcon from '@material-ui/icons/SentimentDissatisfiedSharp';

const useStyles = makeStyles((theme) => ({
    sentimental: {
        color: "red",
        fontSize: "1em",
        marginBottom: "-0.1em",
        marginRight: theme.spacing(1),
    }
}));

export default function Error() {
    const classes = useStyles();

    return (
        <Fragment>
            <Helmet>
                <title>ProgramsOnline - Ошибка 404</title>
                <meta name="description" content="Страница не существует" />
            </Helmet>
            <Box mr={40} mt={10}>
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Typography component="h1" variant="h1" align="center">
                        <SentimentDissatisfiedSharpIcon className={classes.sentimental} />404
                    </Typography>
                    <Typography component="p" variant="h2" align="center">
                        Not Found
                    </Typography>
                </Grid>
            </Box>
        </Fragment>
    )
}