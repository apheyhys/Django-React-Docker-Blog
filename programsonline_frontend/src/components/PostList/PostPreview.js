import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import { addTag } from '../../actions/actionCreator';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 645,
        margin: theme.spacing(1)
    },
    media: {
        objectFit: 'cover'
    }
}));


export default function Post(props) {
    const classes = useStyles();
    const [image_load, setImageLoad] = useState(false);
    const dispatch = useDispatch();

    const {
        image_preview,
        title,
        content_preview,
        tag,
        comments_count,
        slug,
        views_count,
    } = props;

    function onLoad() {
        setImageLoad(true);
    }

    return (
        <Card className={classes.card} variant="outlined">
            <CardActionArea>
                <CardMedia
                    style={{ display: image_load ? 'block' : 'none' }}
                    component="img"
                    alt={title}
                    className={classes.media}
                    height="auto"
                    image={image_preview}
                    title={title}
                    onLoad={onLoad}
                />
                {!image_load && <Skeleton variant="rect" animation="wave" width={"auto"} height={300} />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography component="p">
                        {content_preview}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => {
                            dispatch(addTag(tag))
                        }
                        }>
                        #{tag}
                    </Button>
                    <Typography variant="body2">
                        Комментарии: {comments_count}
                    </Typography>
                    <Typography variant="body2">
                        Просмотры: {views_count}
                    </Typography>
                    <Link to={`/${slug}`}>
                        <Button size="small" color="primary">
                            Подробнее...
                        </Button>
                    </Link>
                </Grid>
            </CardActions>
        </Card>
    );
}