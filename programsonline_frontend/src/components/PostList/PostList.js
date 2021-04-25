import axios from 'axios';
import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import {useDispatch, useSelector} from "react-redux";

import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

import { addOffset} from "../../actions/actionCreator";

import { BASE_PATH, PAGE_COUNT, SEARCH_NAME, TAG_NAME } from "../../constants/constant";
import Post from './PostPreview';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    searcTotalText: {
        lineHeight: 2
    },
    control: {
        padding: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(1)
    },
    progressBox: {
        marginTop: theme.spacing(5),
        minWidth: "645px",
    },
    ads: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
        maxWidth: "645px",
    }
}));


export default function PostList() {
    const classes = useStyles();

    const [results,
        setResults] = useState([]);
    const [count,
        setCount] = useState(0);
    const [total_count,
        setTotalCount] = useState(0);
    const [allArticleCount,
        setAllArticleCount] = useState(0);

    const searchText = useSelector(state => state.searchText)
    const tag = useSelector(state => state.tag)
    const offset = useSelector(state => state.offset)

    const dispatch = useDispatch();

    function offsetChange(offset) {
        dispatch(addOffset(offset))
    }

    useEffect(() => {
        let ignore = false;
        async function fetchData() {
            const result = await axios(`${BASE_PATH}/?${SEARCH_NAME}${searchText}&${TAG_NAME}${tag}&${PAGE_COUNT}${offset}`);
            if (!ignore)
            setResults(result.data.results);
            setCount(result.data.count);
            offsetChange(result.data.offset);
            setTotalCount(result.data.total_count);
            setAllArticleCount(result.data.all_article_count);
        }
        fetchData();
        return () => {
            ignore = true;
        }
    }, [offset, searchText, tag]);

    let search_word_variant = "";
    if (count === 0) search_word_variant += "Совпадений не найдено"
    else if (count === 1) search_word_variant += `Найден ${count} материал`
    else if (count % 100 >= 11 && count % 100 <= 19) search_word_variant += `Найдено ${count} материалов`
    else if (count === 2 || count === 3 || count === 4) search_word_variant += `Найдено ${count} материала`
    else search_word_variant += `Найдено ${count} материалов`

    return (
        <Fragment>
            <Helmet>
                <title>ProgramsOnline - Онлайн программы и сервисы</title>
                <meta name="description" content="ProgramsOnline - Онлайн программы и сервисы" />
                <script type="text/javascript">
                    {`(function(w, d, n, s, t) {
                        w[n] = w[n] || [];
                        w[n].push(function() {
                            Ya.Context.AdvManager.render({
                                blockId: "R-A-471640-1",
                                renderTo: "yandex_rtb_R-A-471640-1",
                                async: true
                            });
                        });
                        t = d.getElementsByTagName("script")[0];
                        s = d.createElement("script");
                        s.type = "text/javascript";
                        s.src = "//an.yandex.ru/system/context.js";
                        s.async = true;
                        t.parentNode.insertBefore(s, t);
                    })(this, this.document, "yandexContextAsyncCallbacks");`}
                </script>
            </Helmet>
            <div id="yandex_rtb_R-A-471640-1" className={classes.ads}></div>
            {results.length===0
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
            {count < allArticleCount
                ?
                <Typography variant="h6" color="inherit" className={classes.searcTotalText}>{search_word_variant}:
                    <Divider variant="fullWidth" />
                </Typography>
                : null
            }
            {results.map(post => <Post
                title={post.title}
                content_preview={post.content_preview}
                tag={post.tag}
                slug={post.slug}
                key={post.id}
                image_preview={post.image_preview}
                comments_count={post.comments_count}
                views_count={post.views_count} />)}
            <Grid container direction="row" justify="center" alignItems="center" >
                {count === 0
                    ? null
                    : <Pagination
                        count={Math.ceil(count / total_count)}
                        variant="outlined"
                        shape="rounded"
                        page={offset===0 ? 1 : offset / total_count + 1}
                        onChange={(event, page) => offsetChange(page * total_count - total_count)}
                    />
                }
            </Grid>
        </Fragment>
    )
}