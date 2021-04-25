import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

import { addTag } from '../../actions/actionCreator';
import { addOffset} from "../../actions/actionCreator";
import { TAG_PATH } from "../../constants/constant";

const useStyles = makeStyles((theme) => ({
    BadgePosition: {
        top: 3,
        right: -4,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

export default function CategoryMenu(props) {
    const classes = useStyles();

    const [tags, setTags] = useState([])

    const dispatch = useDispatch();

    useEffect(() => {
        axios(TAG_PATH).then(res => {
            setTags(res.data.tag_count)
        }
        ).catch(error => {
            console.log(error.response.data);
        })
    }, [])

    function handleTagChange(tag) {
        dispatch(addTag(tag))
    }

    function offsetChange() {
        dispatch(addOffset(0))
    }

    function redirectToMainPage() {
        if (window.location.pathname === "/") {
            return
        } else {
            props.history.push(`/`)
        }
    }

    return (
        <MenuList>
            {tags.map(tag_list =>
                <MenuItem
                    className={classes.menuItem}
                    key={tag_list.tag}
                    onClick={() =>{
                        handleTagChange(tag_list.tag)
                        offsetChange()
                        redirectToMainPage()
                        if (props.handleToggleDrawer) {props.handleToggleDrawer(1, false)}
                    }}
                >
                    <Badge color="primary"
                        badgeContent={tag_list.count}
                        classes={{ anchorOriginTopRightRectangle: classes.BadgePosition }}
                    >
                        {tag_list.tag}
                    </Badge>
                </MenuItem>
            )}
        </MenuList>
    );
}
