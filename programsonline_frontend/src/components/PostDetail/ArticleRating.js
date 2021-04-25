import axios from 'axios'
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';

import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';

import { setSocialDialog } from '../../actions/actionCreator';
import { CREATE_RATING } from "../../constants/constant";

const useStyles = makeStyles((theme) => ({
    firstColor: {
        backgroundColor: "#ef5350"
    },
    secondColor: {
        backgroundColor: "#FF7C02"
    },
    thirdColor: {
        backgroundColor: "#FFD223"
    },
    fourthColor: {
        backgroundColor: "#DDF932"
    },
    fifthColor: {
        backgroundColor: "#26a69a"
    },
}));

export default function SimpleRating(props) {
    const classes = useStyles();

    const userAccess = useSelector(state => state.userAccess)

    const dispatch = useDispatch();

    const [rating, setRating] = React.useState(0);

    const [ratingCount, setRatingCount] = React.useState(0);

    const [ratingOwner, setRatingOwner] = React.useState(0);

    useEffect(() => {
        if (props.rating) {
            setRating(props.rating);
        }
        if (props.rating_count) {
            setRatingCount(props.rating_count);
        }
        if (props.rating_owner==="None" || props.rating_owner==="Unauthorized") {
            setRatingOwner(0);
        } else if  (props.rating_owner>=0.1 || props.rating_owner<=5) {
            setRatingOwner(props.rating_owner)            
        }
    }, [props]);

    function handleRating(newValueRating) {
        if (sessionStorage.getItem("access_token") && Date.now() >= +sessionStorage.getItem("expires_on") + (+sessionStorage.getItem("expires_in") * 1000)) {
            return <Redirect to={sessionStorage.getItem("redirect_url")} />
        } else {
            setRatingOwner(newValueRating)
            const requestOptions = {
                method: 'POST',
                data: {
                    "article_id": props.post_id,
                    "rating": (newValueRating ? newValueRating : 0)
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("access_token")
                }
            }
            axios(CREATE_RATING, requestOptions).then(res => {
                setRating(res.data.rating)
                setRatingCount(res.data.rating_count)
            }

            ).catch(error => {
                console.log(error.response.data);
            })
        }
    }

    let deltaColor = '';
    if (rating > 0 && rating < 1) deltaColor = classes.firstColor;
    else if (rating >= 1 && rating < 2) deltaColor = classes.secondColor;
    else if (rating >= 2 && rating < 3) deltaColor = classes.thirdColor;
    else if (rating >= 3 && rating < 4) deltaColor = classes.fourthColor;
    else if (rating >= 4) deltaColor = classes.fifthColor;


    return (
        <Fragment>
            <Typography variant="body2">Вам понравился сервис?</Typography>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Rating
                    name="simple-controlled"
                    value={ratingOwner}
                    precision={0.5}
                    onChange={(event, newValue) => {
                        userAccess
                            ? handleRating(newValue)
                            : dispatch(setSocialDialog(true))
                    }}

                />
                {rating ? <Chip size="small" label={rating.toFixed(1)} className={(rating > 0 ? deltaColor : null)} /> : null}
            </Grid>

            <Typography variant="body2">Оценок: {ratingCount ? ratingCount : 0}</Typography>
        </Fragment>
    )
}