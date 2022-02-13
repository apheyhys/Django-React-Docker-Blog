import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { YMInitializer } from 'react-yandex-metrika';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import { fade } from "@material-ui/core/es/styles/colorManipulator";
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

import { addTag, setSearchText } from '../../actions/actionCreator';
import logo from '../../assets/logo/drawing.png';
import CategoryMenu from "../Sidebar/CategoryMenu";
import PopularArticle from "../Sidebar/PopularArticle";
import Subscribe from "../Sidebar/Subscribe";
import SearchPanel from './SearchPanel';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 160,
    marginLeft: theme.spacing(1),
    marginBottom: 6,
    marginTop: 10,
    marginRight: 10,
    [theme.breakpoints.down('md')]: {
      maxWidth: 80,
    }
  },
  toolbar: {
    [theme.breakpoints.up('lg')]: {
      alignItems: "flex-end"
    }
  },
  button: {
    marginLeft: theme.spacing(1),
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

export default function Header(props) {
  const classes = useStyles();

  const [searchState, setSearchState] = useState(true)
  const [, setSearchInput] = useState("")

  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  }

  function handleToggleDrawer (anchor, open) {
    setState({ ...state, [anchor]: open });
  }

  return (
    <AppBar position="relative" color="default">
      <YMInitializer accounts={[56192332]} />
      <Toolbar className={classes.toolbar}>

        <Box display={{ lg: 'none' }}>
          <IconButton onClick={toggleDrawer(1, true)}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="left" open={state["1"]} onClose={toggleDrawer(1, false)}>
            <Fragment>
              <Link to='/allposts' onClick={() => {
                setSearchState(false)
                setSearchInput("")
                dispatch(addTag(""))
              }
              }>
                <Button variant="text" className={classes.button} onClick={toggleDrawer(1, false)}>
                  Все программы
                </Button>
              </Link>
              <Link to='/contact' onClick={() => {
                setSearchState(false)
                setSearchInput("")
              }
              }>
                <Button variant="text" className={classes.button} onClick={toggleDrawer(1, false)}>
                  Контакты
                </Button>
              </Link>
              <Divider />
              <CategoryMenu
                handleToggleDrawer={handleToggleDrawer}
                {...props}
              />
              <PopularArticle
                handleToggleDrawer={handleToggleDrawer}
              />
              <Subscribe />
            </Fragment>
          </Drawer>
        </Box>
             <Link to='/' onClick={() => setSearchState(true)}>
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>

          <Box display={{ xs: 'none', md: 'inline' }}>
                      <Link to='/' onClick={() => setSearchState(true)}>
            <Button variant="text" className={classes.button} onClick={() => {
              dispatch(setSearchText(""))
              dispatch(addTag(""))
            }} >
              Посты
            </Button>
          </Link>
            <Link to='/allposts' onClick={() => {
              setSearchState(false)
              setSearchInput("")
              dispatch(addTag(""))
            }
            }>
              <Button variant="text" className={classes.button}>
                Все программы
                            </Button>
            </Link>
            <Link to='/contact' onClick={() => {
              setSearchState(false)
              setSearchInput("")
            }
            }>
              <Button variant="text" className={classes.button}>
                Контакты
                            </Button>
            </Link>
          </Box>
        <div className={classes.grow} />
        {searchState
          ? (
            <SearchPanel
              {...props}
            />
          )
          : null
        }
      </Toolbar>
    </AppBar>
  );
}