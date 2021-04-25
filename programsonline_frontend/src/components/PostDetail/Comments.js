import 'moment/locale/ru';

import classNames from 'classnames';
import React, { Fragment, useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import CreateComment from './CreateComment';
import Likes from './Likes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  listStyle: {
    paddingBottom: 0
  },
  control: {
    padding: theme.spacing(2)
  },
  divider: {
    marginTop: 10
  },
  author: {
    fontWeight: 600
  },
  moment: {
    marginLeft: theme.spacing(1)
  },
  responseLink: {
    fontWeight: "bold",
    marginLeft: theme.spacing(9)
  }
}));


export default function Comments(props) {
  const date = new Date();
  const classes = useStyles();
  const post = props.post;
  const post_slug = props.post_slug;

  const [result,
    setResult] = useState([]);

  const userAccess = useSelector(state => state.userAccess)

  const [expanded, setExpanded] = useState(false)

  const collapseComments = useSelector(state => state.collapseComments)


  const handleChange = (id) => e => {
    setExpanded({
      ...expanded,
      [id]: !expanded[id]
    });
  }

  useEffect(() => {
    if (props.items !== undefined) {
      setResult(props.items)
    }
    setExpanded(false)
  }, [props, collapseComments]);


  return (
    <List className={classes.root}>
      {result.map(comment =>
        <Fragment key={comment.id}>
          <ListItem alignItems="flex-start" className={classes.listStyle}>
            <ListItemAvatar>
              <Avatar variant="rounded" alt="Remy Sharp" src={comment.user_photo} />
            </ListItemAvatar>
            <ListItemText
              primary=
              {
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Box
                  >
                    <Typography
                      component="span"
                      variant="body1"
                      className={classNames(classes.inline, classes.author)}
                      color="textPrimary"
                    >
                      {comment.user_name + " " + comment.user_surname}
                    </Typography>
                    <Typography
                      component="span"
                      variant="caption"
                      className={classes.inline}
                      color="textSecondary"
                    >
                      <Moment className={classes.moment} locale="ru" to={comment.date}>{date}</Moment>
                    </Typography>
                  </Box>
                  <Box>
                    <Likes
                      likes={comment.likes}
                      dislikes={comment.dislikes}
                      owner_state={comment.owner_state}
                      comment_id={comment.id}
                      slug={post_slug}
                      user_access={userAccess}
                    />
                  </Box>
                </Grid>
              }
              secondary={
                <Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.body}
                  </Typography>
                </Fragment>
              }
            />
          </ListItem>
          {userAccess
            ?
            <Fragment>
              <Link
                component="button"
                variant="body2"
                onClick={handleChange(comment.id)}
                color="inherit"
                underline="none"
                className={classes.responseLink}
              >
                Ответить
              </Link>
              <Collapse in={expanded[comment.id]} timeout="auto" unmountOnExit>
                <CreateComment
                  comment_id={comment.id}
                  post={post}
                  post_slug={post_slug}
                />
              </Collapse>
            </Fragment>
            : null}
          <Divider />
          <Box component="div" ml={7}>
            {comment.reply && comment.reply.length ?
              <Comments
                {...props}
                items={comment.reply}
              />
              : null}
          </Box>
        </Fragment>
      )}
    </List>
  )
}