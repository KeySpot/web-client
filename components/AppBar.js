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
  appBar: {
    // background: 'rgba(255, 255, 255, 0.5)',
    // background: 'transparent',
    // boxShadow: 'none',
  },
}));

const linkMapDesktop = [
  { name: 'Records', href: '/records', },
  { name: 'Docs', href: '/docs/cli-tool', },
  { name: 'Account', href: '/account', },
];

const linkMapMobile = [
  { name: 'Records', href: '/records', icon: SubjectIcon, },
  { name: 'Docs', href: '/docs/cli-tool', icon: DescriptionIcon, },
  { name: 'Account', href: '/account', icon: AccountCircleIcon, },
  { name: 'Sign in', href: '/api/auth/login', icon: ExitToAppIcon, },
];

export default function PrimarySearchAppBar({ title, currentTab }) {
  const { user } = useUser();
  const router = useRouter();

  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Link href="/">
            <a>
              <Image height={32} width={96} src={logo} alt="logo" />
            </a>
          </Link>
          <Responsive
            desktop={
              <Tabs value={linkMapDesktop.findIndex(element => element.href.split('/')[1] === router.pathname.split('/')[1])} >
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
      <Toolbar/>
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