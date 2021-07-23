import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '../components/appBar'; 
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import InputBase from '@material-ui/core/InputBase';
import { useState } from 'react';

import config from '../config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // backgroundColor: theme.palette.primary.main,
    // color: theme.palette.primary.contrastText,
  },
  // searchPaper: {
  //   padding: theme.spacing(2),
  //   textAlign: 'left',
  //   backgroundColor: theme.palette.primary.light,
  //   color: theme.palette.primary.contrastText,
  // },
  paperElement: {
    padding: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    // backgroundColor: alpha(theme.palette.primary.light, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
      // backgroundColor: alpha(theme.palette.primary.main, 0.25),
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
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const { user, error, isLoading } = useUser();
  const [searchString, setSearchString] = useState('');

  if (!error && !isLoading && user) router.push('/records');

  if (searchString.length > 0) {
    onkeypress = e => {
      if (e.key === 'Enter') {
        router.push(`/${searchString}`);
      }
    }
  }

  return (
    <div className="background">
      <AppBar title={config.appName} />
      <Head>
        <title>KeySpot</title>
        <meta name="description" content="Written by Carl Schader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div>
          <div className={classes.root} >
            <Container maxWidth="md" >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper className={classes.paper} >
                    <Typography className={classes.paperElement} variant="h4" >Welcome to {config.appName}</Typography>
                    <Typography className={classes.paperElement} >Enter an acceess key or login to create and see your records</Typography>
                    {/* <Paper className={classes.searchPaper} > */}
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
                    {/* </Paper> */}
                  </Paper>
                </Grid>
              </Grid>

              {/* <Grid container spacing={3}>
                <Grid item xs>
                  <Paper className={classes.paper} >
                    <Typography variant="h4" >Landing page</Typography>
                  </Paper>
                </Grid>
              </Grid> */}
            </Container>
          </div>
        </div>
      </main>
    </div>
  )
}
