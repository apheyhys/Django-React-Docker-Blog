import React, { useState } from "react";
import { useDispatch } from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputBase from "@material-ui/core/InputBase";
import { fade } from "@material-ui/core/es/styles/colorManipulator";
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

import { setSearchText } from '../../actions/actionCreator';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        marginRight: 20,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        [theme.breakpoints.up('md')]: {
            marginBottom: 2
        }
    },
    searchIcon: {
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    clearIcon: {
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
    inputInput: {
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:active': {
                width: 250,
            },
            '&:focus': {
                width: 250,
            },
        }
    }
}));


export default function SearchPanel(props) {
    const classes = useStyles();
    const [searchInput, setSearchInput] = useState("")
    const dispatch = useDispatch();

    function redirectToMainPage() {
        if (window.location.pathname === "/") {
            return
        } else {
            props.history.push(`/`)
        }
    }

    return (
        <div className={classes.search}>
            <InputBase
                id="adornment-password"
                value={searchInput}
                placeholder="Поиск..."
                onChange={(e) => {
                    if (e.target.value) {
                        setSearchInput(e.target.value)
                    } else {
                        setSearchInput("")
                        dispatch(setSearchText(""))
                    }
                }
                }
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        dispatch(setSearchText(searchInput))
                        redirectToMainPage()
                    }
                }}
                classes={{
                    input: classes.inputInput
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <IconButton
                            className={classes.searchIcon}
                            disableRipple={true}
                            disableTouchRipple={true}
                            onClick={() => {
                                dispatch(setSearchText(searchInput))
                                redirectToMainPage()
                            }}
                        >
                            <SearchIcon
                            />
                        </IconButton>
                    </InputAdornment>
                }
                endAdornment={
                    <InputAdornment
                        position="end"
                        disableTypography={true}
                    >
                        <IconButton
                            className={classes.clearIcon}
                            disableRipple={true}
                            disableTouchRipple={true}
                        >
                            {searchInput ? <ClearIcon onClick={() => {
                                dispatch(setSearchText(""))
                                setSearchInput("")
                            }} /> : null}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </div>
    )
}