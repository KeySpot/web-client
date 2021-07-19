import AppBar from '../components/appBar';
import useSWR from 'swr';
import Head from 'next/head';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

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

export default function Records() {
  const { data, error } = useSWR('/api/names', url => fetch(url).then(res => res.json()));
  const classes = useStyles();

  function DataView() {
    if (error) {
      return (
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Failed to load: {error.toString()}</Typography>
          </Paper>
        </Grid>
      );
    }
    else if (!data) {
      return (
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Loading...</Typography>
          </Paper>
        </Grid>
      );
    }
    else {
      let items = [
        <Grid item xs={12} >
          <Paper className={classes.paper} >
            <Typography variant="h4" >Records</Typography>
          </Paper>
        </Grid>
      ];
      
      if (data.length === 0) {
        items.push(
          <Grid item xs={12} >
            <Paper className={classes.paper} >
              <Grid container maxWidth="sm">
                {/* <Grid item xs={12} >
                  <Typography variant="p" >No records</Typography>
                </Grid> */}
                <Grid item xs={12} >
                  <Button variant="contained" color="primary" >
                    Add Record
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        );
      }
      
      return items;
    }
  }

  return (
    <div>
      <AppBar title="Records" />
      <Head>{}
        <title>Records</title>
        <meta name="description" content="Written by Carl Schader" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className={classes.root}>
          <Container maxWidth="md" >
            <Grid container spacing={3}>
              <DataView />
            </Grid>
          </Container>
        </div>
      </main>
    </div>
  );
}