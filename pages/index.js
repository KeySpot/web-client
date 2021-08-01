import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AppBar from '../components/appBar'; 
import { alpha, makeStyles } from '@material-ui/core/styles';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Image from 'next/image';
import Landing from '../components/landing';

import logo from '../public/logo.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
  },
  paperElement: {
    padding: theme.spacing(2),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const titleJsx = <Image src={logo} alt="logo" />;

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
    <div className="background scrollable">
      <AppBar title={<Image src={logo} alt="logo"/>} />
      <Head>
        <title>KeySpot</title>
        <meta name="description" content="Written by Carl Schader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div>
          <div className={classes.root} >
            <Container maxWidth="lg" >
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Landing />
                </Grid>
              </Grid>
            </Container>
          </div>
        </div>
      </main>
    </div>
  )
}
