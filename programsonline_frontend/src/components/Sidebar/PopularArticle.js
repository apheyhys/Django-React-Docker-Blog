import axios from 'axios';
import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { ARTICLE_POPULAR_PATH } from "../../constants/constant";

const useStyles = makeStyles((theme) => ({
    heading: {
        justifyContent: "center"
    }
}));

export default function PopularArticle(props) {
    const classes = useStyles();

    const [articleList, setArticleList] = useState([])

    useEffect(() => {
        axios(ARTICLE_POPULAR_PATH).then(res => {
            setArticleList(res.data)
        }
        ).catch(error => {
            console.log(error.response.data);
        })
    }, [])


    return (
        <Paper variant="outlined"
        >
            <List>
                <ListItem
                    divider
                    className={classes.heading}
                    alignItems="center"
                >
                    <Typography
                        variant="button"
                    >
                        Популярные статьи
                                </Typography>
                </ListItem>
                {articleList.map(article =>
                    <Link to={'/' + article.slug} key={article.id} style={{ textDecoration: 'none', color: "inherit" }}>
                        <Fragment>
                            <ListItem
                                button
                                divider
                                key={article.id}
                                className={classes.listItem}
                                 onClick={() =>{
                                    if (props.handleToggleDrawer) {props.handleToggleDrawer(1, false)}
                                }}
                            >
                                <Typography
                                    component="p"
                                >
                                    {article.title}
                                </Typography>
                            </ListItem>
                        </Fragment>
                    </Link>
                )}
            </List>
        </Paper >
    );
}
