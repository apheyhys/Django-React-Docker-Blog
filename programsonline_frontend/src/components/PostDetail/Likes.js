import axios from 'axios'
import classNames from 'classnames';
import { loadCSS } from 'fg-loadcss';
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import { setSocialDialog } from '../../actions/actionCreator';
import { CREATE_DISLIKE_PATH, CREATE_LIKE_PATH } from "../../constants/constant";

const useStyles = makeStyles((theme) => ({
    likeButton: {
        marginTop: -5,
        padding: 5
    },
    dislikeButton: {
        padding: 5
    },
    defaultColor: {
        color: "#6C6C6C"
    },
    green: {
        color: "#388e3c"
    },
    red: {
        color: "#e64a19"
    }
}));

export default function Likes(props) {
    const classes = useStyles();

    const owner_state = props.owner_state;
    const comment_id = props.comment_id;
    const [like, setLike] = useState(props.likes)
    const [dislike, setDislike] = useState(props.dislikes)
    const [likeActive, setLikeActive] = useState(false)
    const [dislikeActive, setDislikeActive] = useState(false)

    const userAccess = useSelector(state => state.userAccess)

    const dispatch = useDispatch();

    useEffect(() => {
        if (owner_state === "Like") {
            setLikeActive(true);
        } else if (owner_state === "Dislike") {
            setDislikeActive(true);
        }
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, [owner_state]);
  
    function handleLike(value) {
        let like_url = "";
        if (value === "LIKE") {
            like_url = CREATE_LIKE_PATH
        } else if (value === "DISLIKE") {
            like_url = CREATE_DISLIKE_PATH
        }
        const requestOptions = {
            method: 'POST',
            data: {
                "comment_id": comment_id
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem("access_token")
            }
        }
        let skipGetResponseAfterDestroy = false
        if (value) {
            axios(like_url, requestOptions).then(res => {
                if (!skipGetResponseAfterDestroy) {
                    if (res.data.like) {
                        setLikeActive(!likeActive)
                        setLike(likeActive ? like - 1 : like + 1)
                        if (dislikeActive) {                            
                            setDislikeActive(!dislikeActive)
                            setDislike(dislikeActive ? dislike - 1 : dislike + 1)
                        }
                    } else if (res.data.dislike) {
                        setDislikeActive(!dislikeActive)
                        setDislike(dislikeActive ? dislike - 1 : dislike + 1)
                        if (likeActive) {                            
                            setLikeActive(!likeActive)
                            setLike(likeActive ? like - 1 : like + 1)
                        } 
                    }
                }
            }).catch(error => {
                if (!skipGetResponseAfterDestroy) {
                    console.log(error.response.data);
                }
            })
            return () => {
                skipGetResponseAfterDestroy = true
            }
        } else {
            return
        }
    }

    const delta = like - dislike;

    let deltaColor = '';
    if (delta === 0) deltaColor += classes.defaultColor;
    else if (delta > 0) deltaColor += classes.green;
    else if (delta < 0) deltaColor += classes.red;
    
    return (
        <Fragment>
            <IconButton
                className={classNames(classes.likeButton, (likeActive && userAccess ? 'fas fa-thumbs-up fa-sm' : 'far fa-thumbs-up fa-sm') )}
                onClick={() => {
                    userAccess
                        ? handleLike("LIKE")
                        : dispatch(setSocialDialog(true))
                }
                }
            />
            <span
                className={deltaColor}
            >
                {delta}
            </span>
            <IconButton
                className={
                    classNames(classes.dislikeButton, (dislikeActive && userAccess ? 'fas fa-thumbs-down fa-sm' : 'far fa-thumbs-down fa-sm'))
                }
                onClick={() => {
                    userAccess
                        ? handleLike("DISLIKE")
                        : dispatch(setSocialDialog(true))
                }
                }
            />
        </Fragment>
    )
}