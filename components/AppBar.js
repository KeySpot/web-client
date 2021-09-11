import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MuiLink from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import DescriptionIcon from '@material-ui/icons/Description';
import SubjectIcon from '@material-ui/icons/Subject';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import Responsive from './Responsive';
import logo from '../public/logo.png';
import AccessKeyContext from '../context/accessKeyContext';

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
  },
  drawerPaper: {
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
}));

const linkMapDesktop = [
  { name: 'records', href: '/records', },
  { name: 'docs', href: '/docs/cli-tool', },
  { name: 'account', href: '/account', },
];

const linkMapMobile = [
  { name: 'records', href: '/records', icon: SubjectIcon, },
  { name: 'docs', href: '/docs/cli-tool', icon: DescriptionIcon, },
  { name: 'account', href: '/account', icon: AccountCircleIcon, },
  { name: 'sign in', href: '/api/auth/login', icon: ExitToAppIcon, },
];

export default function PrimarySearchAppBar({ title, currentTab }) {
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

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar position="fixed">
        <Toolbar>
          <Link href="/">
            <a>
              <Image height={32} width={96} src={logo} alt="logo" />
            </a>
          </Link>
          <Responsive
            desktop={
              <Tabs value={linkMapDesktop.findIndex(element => element.name === router.pathname.split('/')[1])} >
                {linkMapDesktop.map((element, index) => {
                  return (
                    <Link href={element.href} passHref key={index}>
                      <Tab label={element.name} />
                    </Link>
                  );
                })}
              </Tabs>
            }
          />
          <div className={classes.grow} />
          <Responsive
            desktop={
              <>
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
                        color="secondary"
                      >
                        <Avatar alt={user.name} src={user.picture} />
                      </IconButton> :
                      <Link href="/api/auth/login" passHref ><Button color="inherit">Sign in</Button></Link>
                  }
                </div>
              </>
            }
            mobile={
              <div className={classes.sectionMobile}>
                <IconButton onClick={handleDrawerOpen} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
              </div>
            }
          />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="top"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <KeyboardArrowUpIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {linkMapMobile.map((element, index) => {
            const Icon = element.icon;
            return (
              <Link key={index} href={element.href} passHref>
                <ListItem button>
                  <ListItemIcon><Icon /></ListItemIcon>
                  <ListItemText primary={element.name} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </div >
  );
}