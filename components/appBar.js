import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useUser } from '@auth0/nextjs-auth0';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccessKeyContext from '../context/accessKeyContext';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { alpha, makeStyles, useTheme } from '@material-ui/core/styles';

import languages from '../config/languages';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  grow: {
    flexGrow: 1,
    // position: 'fixed',
    // width: '100%',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      maxWidth: "10%",
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  AppBar: {
    // margin: theme.spacing(2),
  },
}));

export default function PrimarySearchAppBar({ title }) {
  const [accessKey, setAccessKey] = useContext(AccessKeyContext);
  const { user, error, isLoading } = useUser(); 
  const router = useRouter();

  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchString, setSearchString] = React.useState('');
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [docsListOpen, setDocsListOpen] = useState(true);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  if (searchString.length > 0) {
    onkeypress = e => {
      if (e.key === 'Enter') {
        setAccessKey(searchString);
        router.replace(`/record`);
      }
    }
  }
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  function MenuItems({ loggedIn }) {
    return loggedIn ?
    [
      <Link key="0" href={`/api/stripe/createCheckoutSession`} passHref >
        <MenuItem key="0" >
            Upgrade
        </MenuItem>
      </Link>,
      <Link key="1" href={`/api/stripe/createPortalSession`} passHref >
        <MenuItem key="1" >
            Manage Subscription
        </MenuItem>
      </Link>,
      <Link key="2" href="/api/auth/logout" passHref ><MenuItem key="2" >Logout</MenuItem></Link>
    ] :
    [
      <Link key="3" href="/api/auth/login" passHref ><MenuItem key="3" >Login</MenuItem></Link>
    ];
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItems loggedIn={user} />
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItems loggedIn={user} />
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar className={classes.AppBar} position="fixed">
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            {title}
          </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <VpnKeyIcon />
              </div>
              <InputBase
              onChange={e => setSearchString(e.target.value)}
                placeholder="Access Key"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          <div className={classes.grow} />
          {user ? <Typography noWrap>{user.name}</Typography> : <></>}
          <div className={classes.sectionDesktop}>
            {
              user ? 

              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar alt={user.name} src={user.picture} /> 
              </IconButton>   :
              <Button color="inherit"><Link href="/api/auth/login" passHref >Login</Link></Button>
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link href="/records" passHref >
              <ListItem button key={'Records'}>
                  <ListItemIcon><SubjectIcon /></ListItemIcon>
                  <ListItemText primary={'Records'} />
              </ListItem>
              </Link>
          </List>
        <Divider />
        <List>
          <ListItem onClick={() => setDocsListOpen(!docsListOpen)} button key={'Docs'}>
            <ListItemIcon><DescriptionIcon /></ListItemIcon>
            <ListItemText primary={'Docs'} />
            {docsListOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={docsListOpen} timeout="auto" unmountOnExit >
            <List>
              {Object.keys(languages).map(name => {
                return (
                <Link key={name} href={`/docs?language=${name}`} passHref >
                  <ListItem button >
                    <ListItemIcon>
                      {languages[name].icon}
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItem>
                </Link>
              );})}
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}