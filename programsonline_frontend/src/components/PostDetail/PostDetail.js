import axios from 'axios';
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/specific_css/specific.css"
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';

import AuthDialog from '../Auth/AuthDialog';
import { setCollapseComments } from '../../actions/actionCreator';
import { BASE_PATH } from "../../constants/constant";
import useTokenCheck from '../../hooks/useTokenCheck';
import ArticleRating from './ArticleRating';
import Comments from './Comments';
import CreateComment from './CreateComment';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        margin: theme.spacing(1),
    },
    link: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginLeft: theme.spacing(2),
    },
    divider: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    mainCommentDivider: {
        width: "100%"
    },
    image: {
        width: "100%",
        maxWidth: "100%"
    },
    progressBox: {
        marginTop: theme.spacing(5),
        minWidth: "100%",
    }
}));

export default function PostList(props) {
    const classes = useStyles();

    const [result,
        setResult] = useState([]);

    const userAccess = useSelector(state => state.userAccess)

    const collapseComments = useSelector(state => state.collapseComments)

    const [{ responseCheckToken }, setToken] = useTokenCheck("")

    const dispatch = useDispatch();

    let history = useHistory();

    useEffect(() => {
        let ignore = false;
        const slug = (props.match.params.slug);
        if (collapseComments) {
            dispatch(setCollapseComments(false))
        }

        let getAccessToken = sessionStorage.getItem("access_token");
        let getExpiresOn = sessionStorage.getItem("expires_on");
        let getExpiresIn = sessionStorage.getItem("expires_in");
        let getRefreshToken = sessionStorage.getItem("refresh_token");

        let requestOptions = ""

        if (getAccessToken !== null) {
            setToken({
                "getAccessToken": getAccessToken,
                "getExpiresOn": getExpiresOn,
                "getExpiresIn": getExpiresIn,
                "getRefreshToken": getRefreshToken
            })
            if (responseCheckToken) {
                requestOptions = {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + getAccessToken
                    }
                }
            }
        } else {
            requestOptions = {
                method: 'GET'
            }
        }
        async function fetchData() {
          try {
             const result = await axios(`${BASE_PATH}/${slug}`, requestOptions);
               if (!ignore ) {
                if (result.statusText==="OK"){
                    setResult(result.data);        }
                }
          } catch (error) {
           history.push('/404')
          }
        }
        fetchData();
        return () => {
            ignore = true;
        }

    }, [collapseComments, responseCheckToken, setToken, props.match.params.slug, dispatch]);

    return (
        <Fragment>
            <Helmet>
                <title>{result.title}</title>
                <meta name="description" content={result.description} />
            </Helmet>
            {result.length===0
                &&
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="relative"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className={classes.progressBox}
                >
                    <CircularProgress />
                </Box>
            }
            <Grid
                container
                item
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h4" component="h1">
                        {result.title}
                    </Typography>
                    <img className={classes.image} src={result.image_preview} alt={result.image_preview_name} />
                    <Link href={result.url} target="_blank">
                       <Typography className={classes.link}>
                          {result.url}
                       </Typography>
                    </Link>
                    <div dangerouslySetInnerHTML={{ __html: result.body }}>
                    </div>
                    <Divider className={classes.divider} light />
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <ArticleRating
                            post_id={result.id}
                            rating_count={result.rating_count}
                            rating={result.star_rating}
                            rating_owner={result.rating_owner}
                        />
                    </Grid>
                </Paper>
                <AuthDialog
                    post_slug={result.slug}
                    comments_count={result.comments_count}
                />
                {userAccess
                    ?
                    <Fragment>
                        <CreateComment
                            comment_id=""
                            post={result.id}
                            post_slug={result.slug}
                            main
                        />
                        <Divider className={classes.mainCommentDivider} />
                    </Fragment>
                    : null}
                <Comments
                    items={result.comments}
                    post={result.id}
                    post_slug={result.slug}
                />
            </Grid>
        </Fragment>
    )
}