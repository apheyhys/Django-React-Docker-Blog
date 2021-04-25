import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import Footer from './Footer/Footer';
import Header from './Header/Header';
import Main from './Main';
import Sidebar from './Sidebar/Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('md')]: {
            justifyContent: "center"
        },
        footer: {
            marginTop: 'auto',
        }
    }
}));

function App() {
    const classes = useStyles();

    return (
        <Fragment>
            <CssBaseline />
            <Grid
             container
            >
                <Grid container>
                    <Route component={Header} />
                </Grid>
                <Container maxWidth="xl">
                    <Grid container direction="row" justify="center">
                        <Grid container direction="row" justify="flex-end" item xs className={classes.root}>
                            <Main />
                        </Grid>
                        <Hidden mdDown>
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                md={2}
                                item
                            >
                                <Sidebar />
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                md={3}
                                item
                            >
                            </Grid>
                        </Hidden>
                    </Grid>
                </Container>
                    <Footer />
            </Grid>
        </Fragment>
    );
}

export default App;
