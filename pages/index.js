import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '../components/appBar'; 
import { makeStyles } from '@material-ui/core/styles';
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

import config from '../config.json';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    // color: theme.palette.text.secondary,
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const { user, error, isLoading } = useUser();

  if (!error && !isLoading && user) router.push('/records');

  return (
    <div>
      <AppBar title={config.appName} />
      <Head>
        <title>KeySpot</title>
        <meta name="description" content="Written by Carl Schader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={classes.root} >
          <Container maxWidth="md" >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper} >
                  <Typography variant="h4" >Welcome to {config.appName}</Typography>
                </Paper>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs>
                <Paper className={classes.paper} >
                  <Typography variant="h4" >Landing page</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  )
}
